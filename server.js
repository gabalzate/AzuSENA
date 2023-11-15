// const express = require("express");
// const path = require("path");


// const app = express();

// app.set("view engine", "ejs");
// app.set("views", __dirname + "/views");

// //colocar como archivos estaticos en la carpeta public 
// app.use("/public", express.static("public"));
// //colocar como archivos estaticos las librerias 
// app.use("/three/", express.static(path.join(__dirname, "public/librerias/three")));
// app.use("/librerias/", express.static(path.join(__dirname, "public/librerias")));

// //renderizar la pagina index
// app.get("/", (req, res) => {
//     res.render("index");
// })

// //pagina no encontrada
// app.use("/", (req, res) => {
    
// })

// //puerto 3000 del servidor 
// app.listen(3000)
// console.log(`Server on port ${3000}`)




// const https = require("https")
// const path = require("path");
// const fs = require("fs")
// const express = require("express")
// const app = express()
// const port = 3000;

// //colocar como archivos estaticos en la carpeta public 
// app.use("/public", express.static("public"));
// //colocar como archivos estaticos las librerias 
// app.use("/three/", express.static(path.join(__dirname, "public/librerias/three")));
// app.use("/librerias/", express.static(path.join(__dirname, "public/librerias")));


// app.set("view engine", "ejs");
// app.set("views", __dirname + "/views");

// https.createServer({
//     key: fs.readFileSync("/localhost-key.pem"),
//     cer: fs.readFileSync("/localhost.pem"),

// }, app).listen(port, function(){
//     console.log("Server on port 3000")
// })


// //renderizar la pagina index
// app.get("/", (req, res,next) => {
//     res.render("index");
// })

// //pagina no encontrada
// app.use("/", (req, res) => {
    
// })




// imports
const https = require('https')
const path = require("path");
const fs = require('fs')
const express = require('express')
const app = express()
const port = 3000
const options = {
    key: fs.readFileSync('localhost-key.pem'),
    cert: fs.readFileSync('localhost.pem'),

}
// Set views
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
// Static files
//colocar como archivos estaticos en la carpeta public 
app.use("/public", express.static("public"));
//colocar como archivos estaticos las librerias 
app.use("/three/", express.static(path.join(__dirname, "public/librerias/three")));
app.use("/librerias/", express.static(path.join(__dirname, "public/librerias")));




app.get('/',(req, res, next) => {
    res.render('index')
})


app.get('/about',(req, res) => {
    res.render('about', {text: 'About page'})
})




// Listen on port 3000
// Esta linea que sigue es para lanzar con otro servicio, no usar en versión final
// app.listen(port, () => console.info(`Listening on port ${port}`))

https.createServer(options, app).listen(port,() => {
    console.log('Server listening on port ' + port);
});