/* eslint-disable no-console */
const nodemailer = require('nodemailer');

require('dotenv/config');

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, CLIENT_HOST } =
  process.env;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
});

const send = async ({ email, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Demo Email 👻" <${SMTP_USER}>`,
      to: email,
      subject: 'Please verify your email',
      html,
    });

    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.log('Error sending email:', error);
  }
};

const sendActivationEmail = (email, token) => {
  const href = `${CLIENT_HOST}/activation/${token}`;
  const html = `
  <h1>Activate your account</h1>
  <p>Follow the link below to activate your account ⬇️</p>
  <a href="${href}">Click me!</a>
  `;

  return send({
    email,
    html,
  });
};

module.exports = {
  send,
  sendActivationEmail,
};
