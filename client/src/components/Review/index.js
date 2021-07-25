import React, { useEffect, useState, useRef } from 'react';
import { UPDATE_PRODUCTS, UPDATE_CURRENT_PRODUCT_ID } from '../../utils/actions';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_PRODUCTS, QUERY_USER } from '../../utils/queries';
import { UPDATE_PRODUCT_REVIEW } from '../../utils/mutations';
import { useStoreContext } from "../../utils/GlobalState";
import { idbPromise } from '../../utils/helpers';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { CardActions } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: 900,
    maxWidth: 600,
  },
  clickMe: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  text: {
    minWidth: 375,
  },
  form: {
    minHeight: 300,
  },
  rootTwo: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

function Review() {
  const classes = useStyles();

  const [state, dispatch] = useStoreContext();

  const [reviewState, setReviewState] = useState('');

  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({})

  const [reviewArr, setReviewArr] = useState({})

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const [updateProductReview] = useMutation(UPDATE_PRODUCT_REVIEW);

  const { products } = state;


  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find(product => product._id === id));
      dispatch({
        type: UPDATE_CURRENT_PRODUCT_ID,
        currentProduct: id
      });
      
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products
      });

      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('products', 'get').then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts
        });
      })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [products, data, loading, dispatch, id, currentProduct]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setReviewState({
      ...reviewState,
      [name]: value,
    });
  };

  const name = useQuery(QUERY_USER);
  let user;
  let firstName;
  let lastName;
  let authorName;

  if (name.data) {
    user = name.data.user;
    firstName = user.firstName;
    lastName = user.lastName;
    authorName = firstName + ' ' + lastName;
    console.log(JSON.stringify(authorName));
  }
  

  // const author = user.firstName + ' ' + user.lastName;

  const handleAddReview = async (event) => {
    event.preventDefault();
    try {
      const data = await updateProductReview({
        variables: {
          productID: currentProduct._id,
          reviewText: reviewState.reviewText,
          author: authorName
        }
      })
      setReviewArr(data.data.updateProductReview.reviews);
    } catch (error) {
      console.log(error);
    };
  };

  let textInput = useRef(null);

  const reviewList = (product) => {
    // Changed condition to if the exist vs if they are undefined
    if (product.reviews) {
      // Changed foreach to map
      return product.reviews.map((review) => {
        return <>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="logo" src="./asset/favicon.ico" />
            </ListItemAvatar>
            <ListItemText
              primary="Reviews"
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {review.author}
                  </Typography>
                  {review.reviewText}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </>
      
      })
    }
  }

  return (
    <>
    <div>
      <div>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt={currentProduct.name}
              image={`/images/${currentProduct.thumbnail}`}
              title={currentProduct.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {currentProduct.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Please feel free to leave a review below!
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActionArea className={classes.form}>
            <form noValidate autoComplete="off">
              <TextField className={classes.text} required name="reviewText" label="Required Review Text" variant="outlined" multiline
                maxRows={3} inputRef={textInput} onChange={handleChange} />
            </form>
            <CardActions>
              <Button className={classes.clickMe} size="small" color="primary" onClick={handleAddReview}>
                + Add Review
              </Button>
              <Button className={classes.clickMe} size="small" color="secondary" onClick={() => { textInput.current.value = ''; }}>
                - Clear Review Text
              </Button>
            </CardActions>
          </CardActionArea>
        </Card>
      </div>
      <div>
                {currentProduct.reviews ?
            ( 
              // Changed function call because you had already passed in currentProduct.reviews here so when you called it in the foreach/map
              // you were essentially asking for product.reviews.reviews 
              <List className={classes.rootTwo}>{reviewList(currentProduct)}</List>
        ) : (<h2>No reviews currently. Be the first to leave some feedback on this product!</h2>)}
      </div>
      </div>
      </>
  )
};

export default Review;
