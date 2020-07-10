const express = require('express');
const bodyParser = require('body-parser');
const excelToJson = require('convert-excel-to-json');
const xlsx = require('xlsx')


const uploadRouter = express.Router();

uploadRouter.route('/')
.post((req,res,next)=>{
    const file = req.file; // file passed from client
    const meta = req.body; // all other values passed from the client, like name, etc..
    
    req.on('data', (data) => {
        
        const workSheetsFromBuffer = xlsx.read(data, {type:"buffer"});

        let buff  = new Buffer.from(data, 'base64');
        var auth = new Buffer.from(data, 'base64').toString();
        let text = buff.toString('ascii');
        console.log(auth)
        //console.log(text)
      });
    res.setHeader('Content-Type', 'multipart/form-data');
    res.status = 200;
   
    res.json("Workss");
})

module.exports = uploadRouter;