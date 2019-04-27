const http = require("http");
const express = require("express");
const multer = require("multer");

var router = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // save files to /public/uplaod
        cb(null, '../public/upload')
    },
    filename: function (req, file, cb) {
        // rename to avoid duplication
        cb(null, file.originalname + new Date().getTime())
    }
});

var upload = multer({
    storage: storage
});

router.post('/upload', upload.single('file'), function (req, res, next) {
    //拼接文件上传后的网络路径
    console.log("file:" + req.file.originalname)
    var url = 'http://' + req.headers.host + '/upload/' + req.file.originalname;

    res.end(req.file.originalname);
});

// 单域多文件上传：input[file]的 multiple=="multiple"
router.post('/upload', upload.array('file', 5), function (req, res, next) {
    // req.files 是 前端表单name=="imageFile" 的多个文件信息（数组）,限制数量5，应该打印看一下
    var fileName = ""
    for (var i = 0; i < req.files.length; i++) {
        // 图片会放在uploads目录并且没有后缀，需要自己转存，用到fs模块
        // 对临时文件转存，fs.rename(oldPath, newPath,callback);
        fileName += req.files[i].originalname + ";"
        fs.rename(req.files[i].path, "upload/" + req.files[i].originalname, function (err) {
            if (err) {
                throw err;
            }
            console.log('done!');
        })
    }

    console.log("fileName:" + fileName)
    res.end(fileName)
})


module.exports = router;