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
			console.log(file,req.body.path);
			
			if(typeof(req.body.path)==='string'){ // 여러 파일중 첫번째 파일
				let filenames = req.body.path;
				let modnames = filenames.split('/').join('_#@');
				const ext = path.extname(modnames);
            	cb(null, path.basename(modnames, ext) + ext)
			}
			else{ // 여러 파일중 첫번째 파일 제외
				let filenames = req.body.path[req.body.path.length - 1];
				let modnames = filenames.split('/').join('_#@');
				const ext = path.extname(modnames);
            	cb(null, path.basename(modnames, ext) + ext);
			}
        },
		
    })
})

router.post('/uploadFile', upload.array('file'), (req, res) => {
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
	});
});


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
	console.log("delete",req.query);
	fs.unlink('uploads/'+filename,(error)=>{
		res.send(true);
	})
})

module.exports = router;