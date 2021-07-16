import React, { useEffect } from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_QR_POPUP } from '../../utils/actions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const { }
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
    <Button variant="outlined" color="primary" onClick={handleClickOpen}>
      View In Your Environment
    </Button>
    <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{currentProduct.name}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-discription">
            Scan the QR Code with your mobile device below to see {currentProduct.name} in your environment using Augmented Reality
            <img src="../../public/images/Localhost.png" alt="qr code"/>
          </DialogContentText>

        </DialogContent>
        <DialogActions>
          <p>
          <strong>Price:</strong>${currentProduct.price}{' '}
          <Button onClick={addToCart}>Add to Cart</Button>
          <Button
            disabled={!cart.find(p => p._id === currentProduct._id)}
            onClick={removeFromCart}
          >
            Remove from Cart
          </Button>
          <Button onClick={handleClose} color="primary">
            Go Back
          </Button>
          </p>
      </DialogActions>
      </Dialog>
      </div>
  );
}