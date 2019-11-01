const path = require('path')
const multer = require('multer')
const date = new Date()

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, path.resolve(__dirname, '../uploads'))
    },
    filename(req, file, cb) {
        cb(null, `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-${file.originalname}`)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

module.exports = multer({
    storage, 
    fileFilter, 
    limits: {
        fileSize: 1024 * 1024 * 5
    }
})