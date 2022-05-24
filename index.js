const express = require("express");
const app = express();

app.get("/", (req, res)=>{
    res.send("<h1>Tamo en vivo'</h1>");
})

app.get("/users", (req, res)=>{
    res.json(
        {
            "username": "Adan",
            "mail": "adan@pecador.com",
        }
    )
})

app.listen(8000, ()=>{
    console.log("Estamos al aire");
})
