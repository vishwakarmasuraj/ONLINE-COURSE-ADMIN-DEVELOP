import nodemailer from 'nodemailer';

export const sendMail = (options) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER_NAME,
            pass: process.env.PASSWORD
        }
    })
    return transporter.sendMail(options);
};

