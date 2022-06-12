const nodemailer = require("nodemailer");

exports.transporter = nodemailer.createTransport({
  host: "smtp.aol.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

exports.verify = async (transporter) => {
  const connection = await transporter.verify();
  if (connection) {
    console.log("Server is already to take your message");
  }
};

exports.welcome = ({ name, email }) => {
  return {
    from: `"${process.env.MAIL_USERNAME}"<${process.env.MAIL_USER}>`,
    to: email,
    subject: "Bienvenido a la aplicación Clon de Trello",
    html: `<div style="background-color:aquamarine">
  <h1>
    Hola! <strong>${name}</strong>, gracias por darnos tu confianza para
    ayudarte en tus tareas
  </h1>
  <p>
    Esperamos que tu experiencia en Clon Trello sea única y alcances tus
    objetivos con nosotros!
  </p>
</div>`,
    text: `Hola! <strong>${name}</strong>, gracias por darnos tu confianza para
    ayudarte en tus tareas. Esperamos que tu experiencia en Clon Trello sea única y alcances tus
    objetivos con nosotros!`,
  };
};
