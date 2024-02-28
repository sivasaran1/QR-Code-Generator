import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import {fileURLToPath} from "url"
import qr from "qr-image"
import fs from "fs"


const __dirname=dirname(fileURLToPath(import.meta.url))
const app=express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname+"/public"))
app.get('/',(req,res)=>{
    res.render(__dirname+"/public/index.ejs")
})



app.post("/yourqr",(req,res)=>{
   var url=req.body["data"];
   var qri=qr.image(url)
   qri.pipe(fs.createWriteStream(__dirname+"/public/images/qrimg.png"))
   var imagePath="images/qrimg.png"
   res.render(__dirname+"/public/index.ejs",{qrimg:imagePath})
})


app.listen(3000,(req,res)=>{
    console.log("listening")
})