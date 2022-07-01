const { checkJWT } = require("../utils/validateSocket");

const Socket = (io) => {
  io.on("connection", async (socket) => {
    console.log("client connect");
    console.log(socket.handshake.query["Authorization"]);
    const [check, id] = checkJWT(socket.handshake.query["Authorization"]);
    console.log(check, id);
    if (check === false) {
      console.log("Usuario invalido");
      return socket.disconnect();
    }
    socket.join(id);
    socket.on("sendNotificationFromBoard", (msg) => {
      console.log(msg);
      io.to(msg.to).emit("sendNotificationFromBoard", msg.msg);
    });
  });
};

module.exports = Socket;
