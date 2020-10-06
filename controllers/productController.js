import {Product} from "../models/Product"

exports.addProduct=(req,res)=>{
    let product = new Product(req.body);
    console.log(req.body)
    product.save((err)=>{
        if(err) return res.status(400).json({success: false, err})

        res.status(200).json({
            success: true,
            msg: "Successfull uploaded Product"
        })
    })
}

exports.searchProduct=(req,res)=>{
    let term = req.body.searchTerm;

    if(term){
        Product
            .find({ $text: { $search: term } })
            .exec((err, products) => {
                if (err) return res.status(400).json({ success: false, err })
                return res.status(200).json({ success: true, products})
            })
    }else{
        Product.find({}, (err, products)=>{
            if(err) return res.status(400).json({success: false, err})
    
            return res.status(200).json({
                success: true,
                msg: "Successfully Fetched Product",
                products
            })
        })
    }
}

exports.updateAvailability=(req,res)=>{
    const { productName, quantity } = req.body.details[0];
  

    Product.findOneAndUpdate(
        {"productName ": productName},
        {$inc : { "availableQty" : -quantity}},
        {new: true},
        (err, doc)=>{
            if(err) return res.json({ success: false, err})

            return res.status(200).json({
                success: true,
                doc
            })
        }
    )

}

