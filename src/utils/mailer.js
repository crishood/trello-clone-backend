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
    subject: "Bienvenido a Trello",
    html: `<div style="
    background-color: #59a7a7;
    color: white;
    font-family: Arial, Helvetica, sans-serif;
    padding: 6px 24px;
    border-radius: 4px;">
    <img
    src="https://res.cloudinary.com/clontrello/image/upload/v1656625031/test-preset/trello-logo_vj8xgw.png"
    alt="Logo de trello"
    width="250"
    style="margin-top: 16px"
  />
  <h2>
    ¡Hola! <strong>${name}</strong>, gracias por darnos tu confianza para
    ayudarte en tus tareas
  </h2>
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

exports.mailChangePassword = ({ name, email }) => {
  return {
    from: `"${process.env.MAIL_USERNAME}"<${process.env.MAIL_USER}>`,
    to: email,
    subject: "Cambio de contraseña EXITOSO",
    html: `<div style="
    background-color: #59a7a7;
    color: white;
    font-family: Arial, Helvetica, sans-serif;
    padding: 6px 24px;
    border-radius: 4px;">
    <img
    src="https://res.cloudinary.com/clontrello/image/upload/v1656625031/test-preset/trello-logo_vj8xgw.png"
    alt="Logo de trello"
    width="250"
    style="margin-top: 16px"
  />
  <h2 >
    ¡Hola! <strong>${name}</strong>.
  </h2>
  <p>
    Te informamos que el cambio realizado de la contraseña en nuestra página web, fue exitoso!
  </p>
</div>`,
    text: `<strong>${name}</strong>, Recuerda visitarnos para seguir completando todas tus tareas`,
  };
};

exports.mailRecoveredPassword = ({ name, email }, token) => {
  return {
    from: `"${process.env.MAIL_USERNAME}"<${process.env.MAIL_USER}>`,
    to: email,
    subject: "Recuperación contraseña en TRELLO",
    html: `<div style="
    background-color: #59a7a7;
    color: white;
    font-family: Arial, Helvetica, sans-serif;
    padding: 6px 24px;
    border-radius: 4px;">
    <img
    src="https://res.cloudinary.com/clontrello/image/upload/v1656625031/test-preset/trello-logo_vj8xgw.png"
    alt="Logo de trello"
    width="250"
    style="margin-top: 16px"
  />
  <h2>
    ¡Hola! <strong>${name}</strong>.
  </h2>
  <p>
    Te informamos que para recuperar la contraseña debes entrar al siguiente link.
  </p>
  <a href="http://localhost:3000/rec-password/${token}" style="color:#044d4d;">Link para recuperar tu contraseña</a>
</div>`,
    text: `Recuperando contraseña de: <strong>${name}</strong>, Recuerda visitarnos para seguir completando todas tus tareas`,
  };
};
