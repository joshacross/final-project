

const QRCode = require('qrcode')

QRCode.toFile('public/assets/images/qr_code_ticket.png', `https://calm-escarpment-47526.herokuapp.com/${concert}`, {
        }, function (err) {
            if (err) throw err
            console.log('qr created');
        });