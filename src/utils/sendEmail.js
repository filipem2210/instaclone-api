require('dotenv').config();
const sgMail = require('@sendgrid/mail');

module.exports = (email) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: email,
      from: process.env.SINGLE_SENDER,
      subject: 'Usuário criado',
      text: 'O seu usuário foi criado com sucesso!',
      html: '<strong>O seu usuário foi criado com sucesso!</strong>',
    };

    return sgMail.send(msg);
  } catch (error) {
    return `${error}`;
  }
};
