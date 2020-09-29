import express from "express"

const router = express.Router()

import {auth} from "../middleware/auth"

import {addCustomer,getCustomer} from "../controllers/customercontroller"

router.post('/addCustomer',auth,addCustomer)

router.get('/getCustomer',getCustomer)

module.exports = router