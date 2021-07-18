import React from 'react';
// import { useParams } from 'react-router-dom';
// import { useStoreContext } from "../utils/GlobalState";
var QRCode = require('qrcode.react');

function QRCodeComponent () {
    // const [ state, dispatch ] = useStoreContext();

    // const { id } = useParams();

    // const [currentProduct, setCurrentProduct] = useState({});

    React.render(
    <QRCode value='https://google.com' />,
    mountNode
    );

};

export default QRCodeComponent;