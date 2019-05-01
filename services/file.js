const path = require('path');
const multer = require('multer');
const { UPLOAD_MODE } = require('../constants')

exports.uploader = (FIELD_NAME, mode = UPLOAD_MODE.SINGLE, isDest = false) => {
    // dest or storage
    let multerObj = null;
    let upload = null;

    if (isDest) {
        multerObj = multer({
            dest: path.join(__dirname, 'upload')
        });
    } else {
        let storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, path.join(__dirname, '../public/upload'));
            },
            filename: (req, file, cb) => {
                cb(null, file.fieldname + '-' + Date.now());
            }
        });
        multerObj = multer({
            storage: storage
        });
    };

    switch (mode) {
        case UPLOAD_MODE.SINGLE:
            upload = multerObj.single(FIELD_NAME);
            break;
        case UPLOAD_MODE.ARRAY:
            upload = multerObj.array(FIELD_NAME);
            break;
        case UPLOAD_MODE.ANY:
            upload = multerObj.any();
            break;
        default:
            upload = null;
            break;
    }

    return upload;
}