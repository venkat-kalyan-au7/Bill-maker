import React, { useEffect, useState,Fragment } from 'react'
import Axios from 'axios';
import Card from "./Card"


function ProductPage() {
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

    

    return(

        <Fragment>

        <div className="row">
            {Products.map((product, i) => (
                <div key={i}  className='col-4 mb-3'>
                    <Card product={product} />
                </div>
            ))}
        </div>
        </Fragment>
        
    )
}

export default ProductPage