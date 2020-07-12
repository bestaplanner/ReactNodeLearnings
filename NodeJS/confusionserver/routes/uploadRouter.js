const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const multer = require('multer');
const xlsxFile = require('read-excel-file/node');
const XLSX = require('xlsx');
const fs = require("fs");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const imageFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      //if(!file.originalname.match(/\.(xls|xlsx)$/)) {
        return cb(new Error('You can upload only excel files!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter});

const uploadRouter = express.Router();

uploadRouter.use(bodyParser.json());

uploadRouter.route('/')
.get(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /imageUpload');
})
/*.post(authenticate.verifyUser, authenticate.verifyAdmin, upload.single('imageFile'), (req, res) => {

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    //xlsxFile('./public/images/temp.xlsx').then((rows) => {
      //console.log(rows);
      //console.table(rows);
     //})
     var workbook = XLSX.readFile('./public/images/temp.xlsx');
     var sheet_name_list = workbook.SheetNames;
     console.log(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]))
     fs.unlinkSync('./public/images/temp.xlsx')
    res.json(req.file);
})*/
.post(authenticate.verifyUser, authenticate.verifyAdmin, upload.single('imageFile'), (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json(req.file);
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /imageUpload');
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /imageUpload');
});

module.exports = uploadRouter;