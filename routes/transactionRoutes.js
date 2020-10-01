import express from "express"

const router = express.Router()

import {auth} from "../middleware/auth"

import {newBill,
    transactionById,
    refund,
    allTransactions,
    generatePdf,
    fetchPdf} from "../controllers/transactioncontroller"

router.post('/createTransaction',auth,newBill)

router.get('/getTransaction/:transactionId',auth,transactionById)

router.post('/refundTransaction',auth,refund)

router.get('/getTransactionList',auth,allTransactions)

router.post('/createPdf',auth,generatePdf)

router.get('/fetchPdf',auth,fetchPdf)
module.exports = router
