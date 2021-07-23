import React, { useEffect, useState, useRef } from 'react';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { Link, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { ADD_REVIEW } from '../../utils/mutations';
import { useStoreContext } from "../../utils/GlobalState";
import { idbPromise } from '../../utils/helpers';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: 900,
    maxWidth: 600,
  },
  buttons: {
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
  }
}));

function Review() {
  const classes = useStyles();

  const [state, dispatch] = useStoreContext();

  const [reviewState, setReviewState] = useState({ reviewText: ''});
  
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({})

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const [ addReview, { error } ] = useMutation(ADD_REVIEW);

  const { products } = state;


  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find(product => product._id === id));
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
  }, [products, data, loading, dispatch, id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setReviewState({
      ...reviewState,
      [name]: value,
    });
  };

  const handleAddReview = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await addReview({
        variables: {
          _id: currentProduct._id,
          reviewText: reviewState.reviewText
        }
      });
      const data = mutationResponse.data.addReview.product.reviews
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  let textInput = useRef(null);

  return (
    <>
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
            maxRows={3} inputRef={textInput} onChange={ handleChange }/>
      </form>
        <Button className={classes.buttons} size="small" color="primary" onClick={handleAddReview}>
        + Add Review
        </Button>
        <Button className={classes.buttons} size="small" color="secondary" onClick={() => { textInput.current.value = '';}}>
        - Clear Review Text
        </Button>
      </CardActionArea>
    </Card>
    
      <div>
        Here are current reviews: {currentProduct.reviews}
    </div>
      </>
  )
};

export default Review;
