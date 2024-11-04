const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const path=require("path");
const fs=require("fs");
const app=express();
const route=require("./routes/sendroutes");
app.use(bodyParser.urlencoded({extended:true}));

app.use("/",express.static(path.join(__dirname,"public")));

app.use("/message",route);

app.listen("3000",function(req,res){
  console.log("server is up at 3000");
})
