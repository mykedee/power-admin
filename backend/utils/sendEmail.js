const nodemailer = require("nodemailer");
const pug = require("pug");
const { htmlToText } = require("html-to-text");

module.exports = class Email {
  constructor(user) {
    this.to = user.email;
    this.username = user.username;
    this.code = user.code;
    this.copyRightDate = user.copyRightDate;
    this.Url = user.Url;
    this.from = `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_HOST,
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
        },
      });
    }
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_HOST,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      {
        username: this.username,
        Url: this.Url,
        subject,
        code: this.code,
        copyRightDate: this.copyRightDate,
      }
    );
    const message = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText(html),
    };
    await this.newTransport().sendMail(message);
  }
  async sendVerificationMessage() {
    await this.send("welcome", "User Email Verification");
  }
  async sendForgotPasswordMessage() {
    await this.send("forgotPassword", "Forgot Password");
  }
};
