import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/temp')
    },
    filename: function (req, file, cb) {

        // used to make file name unique...
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // cb(null, file.fieldName + '-' + uniqueSuffix) // n is small in fieldName 

        cb(null, file.originalname)
    }
})

export const upload = multer({
    storage
})
