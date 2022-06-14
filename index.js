const mongoose = require("mongoose");
const express = require("express");
const app = express();
require('dotenv').config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./Routes/auth.js")
const ticketRoutes = require("./Routes/tickets.js")

const uri = "mongodb://flutterdeploy:" + encodeURIComponent('Read11#') + "@35.154.147.81:27017/admin"
 

//Database Connection
mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .catch((error)=>{
        console.log(error)
    })
    .then(() => {
        console.log("DB connected");
    });

//Middleware
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

//Routes
app.use("/api", authRoutes)
app.use("/api",ticketRoutes)

const port = 8000;

app.listen(port, ()=>{
    console.log(`App is up and running at port ${port}`)
})