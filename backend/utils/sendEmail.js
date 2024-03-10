const nodemailer = require("nodemailer");

const sendEmail = async (options) => {

 // create reusable transporter object using the default SMTP transport
 const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true, 
  auth: {
   user: process.env.SMTP_USERNAME, // generated ethereal user
   pass: process.env.SMTP_PASSWORD, // generated ethereal password
  },
 });

 // send mail with defined transport object
 const message = {
  from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`, // sender address
  to: options.email,
  subject: options.subject,
  text: options.message,
 };

 const info = await transporter.sendMail(message)


 console.log("Message sent: %s", info.messageId);


}

module.exports = sendEmail
