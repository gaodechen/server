const file = require('../services/file')
const { responseClient } = require('../utils')
const { HTTP_CODE, HTTP_MSG } = require('../constants')

exports.post = (req, res) => {
    const upload = file.uploader('file');
    upload(req, res, (err) => {
        if (err) {
            responseClient(res, HTTP_CODE.REQUEST_FAILED, HTTP_MSG.REQUEST_FAILED.UPLOAD_FAILED, err);
        } else {
            responseClient(res, HTTP_CODE.SUCCESS, HTTP_MSG.SUCCESS.UPLOAD);
        }
    });
};
