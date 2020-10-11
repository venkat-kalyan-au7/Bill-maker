import React,{useState} from "react";


 
const Card = ({
  product,
  
  setRun = f => f,
  run = undefined
  // changeCartSize
}) => {
 
  const [count, setCount] = useState(product.count);
 
 
  return (
    <div className="card ">
      <div className="card-header card-header-2 ">{product.productName}</div>
      <div className="card-body">
        
        <img src={product.images[0]} style={{width: '150px', height: '150px'}} />
      
        <p className="card-p black-10">₹ {product.price}</p>
      
      
      </div>
    </div>
  );
};
 
export default Card;