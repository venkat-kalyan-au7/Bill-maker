import React, { useEffect, useState } from 'react'
import './LandingPage.css';
import Axios from 'axios';

function LandingPage() {
    const [Products, setProducts] = useState([]);
  

    const getProducts = (payload)=>{
        Axios.post('/api/product/getProducts', payload)
       .then(response => {
           if(response.data.success){
                setProducts(response.data.products);
           }else{
               alert('Failed to fetch product data');
           }
       })
    }

    useEffect(() => {
        getProducts()
    }, [])

   

    console.log(Products);
    const RenderItems = Products.length > 0 && Products.map((product, index)=>(
        <tr>
            <td><img src={product.images[0]} style={{width: '70px', height: '30px'}}/></td>
            <td>{product.productName}</td>
            <td>{product.totalQty}</td>
            <td>{product.availableQty}</td>
            <td>Rs {product.price}</td>
        </tr>
    ));
    return (
        <div style={{maxWidth: '85%', margin: '2rem auto'}}>
          
            <table>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Product</th>
                        <th>Total Qty</th>
                        <th>Available Qty</th>
                        <th>Price/Item</th>
                    </tr>
                </thead>
                <tbody>
                  {
                      RenderItems
                  }
                </tbody>
            </table>
        </div>
    )
}

export default LandingPage