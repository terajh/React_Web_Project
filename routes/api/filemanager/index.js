const router = require('express').Router();
const Error = require('../util/error');
const multer = require('multer');
const fs = require('fs');
const path = require('path');


fs.readdir('uploads/', (error) => {
    // uploads 폴더 없으면 생성
    if (error) {
		console.log("make uploads directory");
        fs.mkdirSync('uploads/');
    }
	console.log('upload already exists');
})

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + ext);
        },
		
    })
})
// 이미지 업로드를 위한 API
// upload의 single 메서드는 하나의 이미지를 업로드할 때 사용
router.post('/uploadFile', upload.array('file'), (req, res) => {
    res.send(true);
})

router.get('/getLists',(req,res)=>{
	console.log('getLists get');
	fs.readdir('uploads/',(error,filelist)=>{
		console.log(filelist);
		res.send({list:filelist});
	})
})

router.get('/readfile',(req,res)=>{
	var filename = path.parse(req.query.data).base;
	
	console.log("req",req.query.data);
	fs.readFile('uploads/'+filename,'utf-8',(error,data)=>{
		if(error) console.log(error);
		console.log("descriptons  ",data);
		res.send(data);
	})
})
router.get('/updatefile',(req,res)=>{
	var newFilename = req.query.newtitle;
	var filename = req.query.title;
	var descriptions = req.query.descriptions;
	console.log("update",req.query);
	fs.rename('uploads/'+filename,'uploads/'+newFilename,(error)=>{
		fs.writeFile('uploads/'+newFilename,descriptions,'utf-8',(error)=>{
			res.send(true);
		})
	})
})

module.exports = router;