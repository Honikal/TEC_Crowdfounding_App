import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const sendEmail = async (toEmail: string, subject: string, description: string) => {
    /*Función encargada de enviar un mensaje cualquiera al correo del usuario, para notificar de
    información importante a considerar*/

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: toEmail,
        subject: subject,
        text: description
    }

    await transporter.sendMail(mailOptions);
}

export default sendEmail;