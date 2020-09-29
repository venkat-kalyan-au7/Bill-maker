import {Customer} from "../models/Customer"

exports.addCustomer=(req,res)=>{
    const newCustomer = new Customer(req.body);

    newCustomer.save((err)=>{
        if(err) return res.status(400).json({ success: false, msg: "Failed to add Customer", err})

        return res.status(200).json({
            success: true,
            msg: "Successfuly added customer"
        })
    })
}

exports.getCustomer=(req,res)=>{
    Customer.find({}, (err, customers)=>{
        if(err) return res.status(400).json({success: false, err})

        return res.status(200).json({
            success: true,
            msg: "Successfully Fetched Customers",
            customers
        })
    })
}