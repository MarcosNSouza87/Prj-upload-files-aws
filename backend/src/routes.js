const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer");
const connection = require("./database/connection");
const crypto = require("crypto");

//get all files of database
routes.get("/files", async (req, res) => {
  //  const posts = await Post.find();
  const files = await connection("file").select("*");
  console.log(files);
  return res.json(files);
});

//create file in database
routes.post("/files", multer(multerConfig).single("file"), async (req, res) => {
  const { originalname: name, size, key, location: url = "" } = req.file;
  const id = crypto.randomBytes(4).toString("HEX");
  const createAt = new Date().toJSON();
  const file = await connection("file").insert({
    id,
    name,
    size,
    key,
    url,
    createAt,
  });
  console.log(file);
  return res.json(file);
});

routes.delete("/files/:id", async (req, res) => {
  const file = await connection("file").where("id", req.params.id).first();
  if (file) {
    await connection("file").where("id", file.id).delete();
    return res.status(200).send();
  }
  return res.status(204).send();
});

module.exports = routes;
