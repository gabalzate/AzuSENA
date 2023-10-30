const express = require("express");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

//colocar como archivos estaticos en la carpeta public 
app.use("/public", express.static("public"));
//colocar como archivos estaticos las librerias 
app.use("/three/", express.static(path.join(__dirname, "public/librerias/three")));
app.use("/librerias/", express.static(path.join(__dirname, "public/librerias")));

//renderizar la pagina index
app.get("/", (req, res) => {
    res.render("index", {titulo1: "titulo dinamico"});
})

//pagina no encontrada
app.use("/", (req, res) => {
    
})

//puerto 3000 del servidor 
app.listen(3000)
console.log(`Server on port ${3000}`)