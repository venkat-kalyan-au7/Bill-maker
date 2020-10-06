import express from "express"

const router = express.Router()

import multer from "multer"

import {addProduct,
        searchProduct,
        updateAvailability,} from "../controllers/productController"


import {auth} from "../middleware/auth"

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png' || ext !== '.jpeg') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")

// Upload Images on nodeServer
router.post('/uploadImage', auth, (req, res)=>{
    upload(req, res,err => {
        if(err){
            return res.json({ success: false, err})
        }

        return res.json({
            success: true,
            image: res.req.file.path,
            fileName: res.req.file.filename 
        })
    })
})

router.post('/uploadProduct', auth, addProduct)


router.post('/getProducts',searchProduct)

router.put('/updateAvailability',updateAvailability)


module.exports = router