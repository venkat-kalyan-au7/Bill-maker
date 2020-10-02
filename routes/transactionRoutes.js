import express from "express"
import path from "path"

const router = express.Router()

import {auth} from "../middleware/auth"

import {newBill,
    transactionById,
    refund,
    allTransactions,
    generatePdf,
    } from "../controllers/transactioncontroller"

router.post('/createTransaction',auth,newBill)

router.get('/getTransaction/:transactionId',auth,transactionById)

router.post('/refundTransaction',auth,refund)

router.get('/getTransactionList',auth,allTransactions)

router.post('/createPdf',generatePdf)


router.get('/fetchPdf', (req, res)=>{
    res.sendFile(path.join(__dirname,"../","report.pdf"))
})



module.exports = router
