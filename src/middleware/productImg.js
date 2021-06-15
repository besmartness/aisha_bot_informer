const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: 'assets/image/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const up = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024*1024
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            return cb (Error("Allowed file types are png jpg jpeg"), false)
        }

        cb (null, true)
    }
})

module.exports = up