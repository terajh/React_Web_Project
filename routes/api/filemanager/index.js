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
			// console.log("yploadadad",typeof(req.body.aa))
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
			console.log(file,req.body.path);
			if(typeof(req.body.path)==='string'){
				let filenames = req.body.path;
				let modnames = filenames.split('/').join('_#@');
				const ext = path.extname(modnames);
            	cb(null, path.basename(modnames, ext) + ext)
			}else if(typeof(req.body.path)==='undefined'){
				const ext = path.extname(file.originalname);
            	cb(null, path.basename(file.originalname, ext) + ext);
			}else{
				let filenames = req.body.path[req.body.path.length - 1];
				let modnames = filenames.split('/').join('_#@');
				const ext = path.extname(modnames);
            	cb(null, path.basename(modnames, ext) + ext);
			}
        },
		
    })
})
// 이미지 업로드를 위한 API
// upload의 single 메서드는 하나의 이미지를 업로드할 때 사용
router.post('/uploadFile', upload.array('file'), (req, res) => {
	// console.log("updatatatatat",req.file);
    res.send(true);
});

router.get('/getLists',(req,res)=>{
	console.log('getLists get');
	fs.readdir('uploads/',(error,filelist)=>{
		var resultslist=[];
		filelist.forEach(e=>{
			let temp = e.split('_#@').join('/');
			resultslist.push(temp);
		})
		res.send({list:resultslist});
	})
})

router.get('/readfile',(req,res)=>{
	var filename = path.parse(req.query.data).base;

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
router.get('/deletefile',(req,res)=>{
	var filename = req.query.title;
	console.log("update",req.query);
	fs.unlink('uploads/'+filename,(error)=>{
		res.send(true);
	})
})

module.exports = router;