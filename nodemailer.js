const nodemailer = require("nodemailer");
const config = require('./api/config/config');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: 'lmuralles7@gmail.com',
    pass: secret
  }
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMail() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: config.mailUser, // sender address
    to: "lmuralles7@gmail.com", // list of receivers
    subject: "Correo desde node", // Subject line
    text: "Hola desde node con env", // plain text body
    html: "<b>Hola desde node con env<b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

sendMail().catch(console.error);
