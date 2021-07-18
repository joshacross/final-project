// import React, { useState } from 'react';
// import QRCode from 'qrcode';
// import {Container } from 'material-ui';
// const [imageUrl, setImageUrl] = useState('')
// import { classes } from '@material-ui/styles';

// function handleClickOpen() {
    
//     dispatch({ type: TOGGLE_QR_POPUP })

//     generateQRCode() = async () => {
//         try {
//           const response = await QRCode.toDataURL(`http://localhost:3000/products/${id}/ar`);
//           setImageUrl(response);
//         }
//         catch (error) {
//           console.log(error);
//         };
// }

// const handleClickOpen = () => {
//     dispatch({ type: TOGGLE_QR_POPUP })
    
//     generateQRCode() = async () => {
//         try {
//           const response = await QRCode.toDataURL(`http://localhost:3000/products/${id}/ar`);
//           setImageUrl(response);
//         }
//         catch (error) {
//           console.log(error);
//         };
// }
    
//       return (
//         <Container>
//             <Button className={classes.btn} variant="contained" color="primary" onClick={() => generateQRCode()}>
//                 View In Your Environment
//             </Button>
//             <img src={imageUrl} alt='img'/>
//         </Container>
//       );

//     };
// };

// export default QRCodeComponent;

// handleClickOpen.QRCodeComponent();