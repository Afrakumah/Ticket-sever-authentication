import nodemailer, { createTransport } from 'nodemailer';


 export const sendEmail = async (options) => {
    const transport =  nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        // secure: false,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    const emailOptions = {
        from: "Angelina Opoku<ticketsInc.com>",
        to: options.email,
        subject: options.subject,
        text: options.text
    }


    return await transport.sendMail(emailOptions);
}