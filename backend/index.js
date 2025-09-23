const port = 4000;
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path')
const cors = require('cors')

app.use(express.json())
app.use(cors())

// Database Connection with MongoDB
mongoose.connect("mongodb+srv://danindu:daninduPass@cluster0.pqlevkt.mongodb.net/e-commerce")

//API Creatation

app.get("/", (req, res)=> {
    res.send("Express App is Running")
})



app.listen(port, (error)=>{
    if(!error){
        console.log("Server running on port "+port);
        
    }else{
        console.log("Error: "+error);
        
    }
})

