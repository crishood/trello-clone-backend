const Busboy = require("busboy");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// const data = new FormData();
// data.append("username", username);
// data.append("file", file);

formData = (req, res, next) => {
  const bb = Busboy({ headers: req.headers });
  req.body = {};
  //Captura partes que no son un archivo
  bb.on("field", (key, val) => {
    req.body[key] = val;
  });

  //Captura partes que si son un archivo
  bb.on("file", (key, stream) => {
    const cloud = cloudinary.uploader.upload_stream(
      { upload_preset: "Trello_imgProfile" },
      (err, res) => {
        if (err) throw new Error("Something went wrong!");

        // console.log("response cloudinary", res);
        req.body[key] = res;
      }
    );

    stream.on("data", (data) => {
      cloud.write(data);
    });

    stream.on("end", () => {
      cloud.end();
    });
  });

  bb.on("finish", () => {
    next();
  });

  req.pipe(bb);
};

module.exports = formData;
