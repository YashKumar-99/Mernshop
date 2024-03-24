const multer = require('multer');

const path = require('path')



let storage = multer.diskStorage({


    destination: function (req, file, cb) {
        cb(null, 'uploads/productImages')
    },

    // filename: function (req, file, cb) {
    //     const uniqueSuffix = Date.now() + '-' + M    ath.round(Math.random() * 1E9)

    //     cb(null, file.fieldname + '-' + uniqueSuffix)


    // }

    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
},


);



const filefilter = (req, file, cb) => {

    

    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {

        console.log('called');
        cb(null, true)
    } else {
        cb(null, false);

        return cb(new Error("ONly  .png .jpg & .jpeg formateed Allowed!!"))
    }
}


var productMulter = multer({
    storage: storage,
    filefilter: filefilter
});

module.exports = productMulter;
