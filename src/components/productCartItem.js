import React from 'react';
import '../css/productCart.css';

function ProductCartItem(props){

  const [price,editPrice] = React.useState(0)

  React.useEffect(()=>{

     
      let price_ =  ( parseInt(props.data.sellingPrice) * ( (parseInt(props.data.gst) / 100) ) );
      price_ = parseInt(props.data.sellingPrice) + price_;


      price_ = price_ * props.data.quantity

      editPrice(price_)

  },[])

  return(
    <div className="productCart-list">
      <div>
        {/* ... title... */}
        <label>Product Name: <span>{props.data.title}</span></label>
        {/* .... sellingPrice .... */}
        <label>Product Selling Price Rs: <span>{props.data.sellingPrice}</span></label>
        {/* ..... gst ..... */}
        <label>Product GST <span>{props.data.gst}%</span></label>
        {/* ..... total Price .... */}
        <label>Total Price Rs: <span>{price}</span></label>
        {/* .......... quantity ......... */}
        <label>Product Quantity: <span>{props.data.quantity}</span></label>


      </div>
    </div>
  )
}

export default ProductCartItem
