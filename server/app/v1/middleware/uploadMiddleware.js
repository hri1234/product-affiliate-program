const multer = require('multer')
var path = require('path');
const fs = require('fs');


const storage = multer.diskStorage({
  destination: async function (req, file, cb) {

    cb(null, `./server/app/v1/utils/images`)
  },

  filename: async function (req, file, cb) {
    const extension = path.extname(file.originalname);
    cb(null, file.originalname)
  }


}
)

const upload = multer({
  storage: storage,

  fileFilter: async function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      req.checkImage = "Only images are allowed"
      return callback(null,'Only images are allowed')
    }
    callback(null, true)
  },

})
module.exports = upload


