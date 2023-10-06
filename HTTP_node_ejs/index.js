const express = require("express");
const res = require("express/lib/response");
const app = express();
const ejs = require("ejs");

let render = `(()=>{
    let data = {
        user: {
            name: "AzuSENA",
            tag: 3006
        }
    }
    return data
})()`;

app.use("/assets", express.static("./assets"));

app.get("*", async (req, res)=>{
    if(req.url == "/"){
        ejs.renderFile("./views/index.ejs", await eval(render), null, function(err, str){
            if(err){
                console.log("Error originado en ", req.url);
                console.log(err);
                res.send("Un error ha ocurrido");
                return
            };
            res.status(404);
            res.send(str);
            } 
        ) 
        return 
    } else if(req.url == "/home"){
        ejs.renderFile("./views/index.ejs", await eval(render), null, function(err, str){
            if(err){
                console.log("Error originado en ", req.url);
                console.log(err);
                res.send("Un error ha ocurrido");
                return
            };
            res.status(404);
            res.send(str);
            } 
        ) 
        return 
    }else{
        return res.send("404 Not found PAGE")
    }
});



app.listen(3000, ()=>console.log("Servidor express encendido"));