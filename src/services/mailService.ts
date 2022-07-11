
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer';
import { MailParams } from "../types/mailTypes"

export async function sendMail(mail: MailParams) {
    const transporter: Mail = nodemailer.createTransport({
        host: process.env.MAILTRAP_HOST,
        port: parseInt(process.env.MAILTRAP_PORT),
        auth: {
          user: process.env.MAILTRAP_USERNAME,
          pass: process.env.MAILTRAP_PASSWORD
        }
      })

    return transporter.sendMail({
        to: {
            name: mail.to.name,
            address: mail.to.email,
        },
        from: {
            name: mail.from.name,
            address: mail.from.email,
        },
        subject: mail.subject,
        text: mail.text,
    })
}