import nodemailer from "nodemailer";
import logger from '../logger.js';

const user = 'razonir@gmail.com'

let transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: user,
        pass: 'dutldbnnzqqwmhcw'
    }
});

export const sendMail = (to, subject, message) => {
    let mailOptions = {
        from: user,
        to,
        subject,
        text: message
    };
    transporter.sendMail(mailOptions,(error,info)=>{
        if (error) {
            logger.error(error);
        } else {
            logger.debug('Email sent: ' + info.response);
        }
    });
}
