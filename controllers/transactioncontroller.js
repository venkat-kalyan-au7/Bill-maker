import {Transaction} from "../models/Transaction"
import {Product} from "../models/Product"



import pdfTemplate from "../Pdf/index"
import pdf from "html-pdf"
import path from "path"

exports.newBill =(req,res)=>{
    const newTransaction = new Transaction(req.body);
    let productUpdation = false;
    const transactionDetails = req.body.transactionDetails;

    console.log("transactionDetails: ", transactionDetails);
    transactionDetails.forEach((item)=>{
        Product.findOneAndUpdate(
            {"productName" : item.productName},
            {$inc : {"availableQty" : -item.quantity } },
            { new : true},
            (err)=>{
                if(err){
                    console.log(err);
                    if(err) return res.status(400).json({ success: false, msg: "Failed transaction", err})
                }else{
                   
                    console.log('success')
                }
            }
        )
    })
   
        newTransaction.save((err, transaction)=>{
            if(err) return res.status(400).json({ success: false, msg: "Failed to add Customer in transaction", err})
    
            return res.status(200).json({
                success: true,
                msg: "Successfuly Transaction",
                transaction
            })
        })
}


exports.transactionById=(req,res)=>{
    console.log(req.params.transactionId);
    let id = req.params.transactionId
    Transaction.findById(id, (err, details)=>{
        if(err) return res.status(400).json({ success: false, err})

        return res.status(200).json({
            success: true,
            details
        })
    })
}

exports.refund=(req,res)=>{
    const newTransaction = new Transaction(req.body);
    const transactionDetails = req.body.transactionDetails;

    transactionDetails.forEach((item)=>{
        console.log("item:", item);
        Product.findOneAndUpdate(
            {"productName" : item.productName},
            {$inc : {"availableQty" : item.quantity } },
            { new : true},
            (err)=>{
                if(err){
                    if(err) return res.status(400).json({ success: false, msg: "Failed to refund", err})
                }else{
                    console.log('success')
                }
            }
        )
    })
   
        newTransaction.save((err, transaction)=>{
            if(err) return res.status(400).json({ success: false, msg: "Failed  transaction", err})
    
            return res.status(200).json({
                success: true,
                msg: "Successfuly Refunded",
                transaction
            })
        })
}


exports.allTransactions=(req,res)=>{
    Transaction.find({}, {
        'parentTransactionId': 0,    // select keys to return here
    }, {sort: '-createdAt'}, function(err, transaction) {
        // use it here
        if(err) return res.status(400).json({ success: false, err})

        return res.status(200).json({
            success: true,
            transaction
        })

    });
}
