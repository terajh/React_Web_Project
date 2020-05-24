const multer = require('multer');
const moment = require('moment');

const upload = multer({
	storage : multer.diskStorage({
		destination : function(req, file, cb){
			cb(null, './');
		},
		filename: function(req, file, cb){
			cb(null, moment().format('YYYYMMDDHHmmss')+"_"+file.originalname);
		}
	})
});
// 하나의 파일을 업로드 할 때

module.exports = upload;