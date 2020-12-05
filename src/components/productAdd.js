import React from 'react';
import '../css/productAdd.css';
import {data} from './storeInfo.js';
import logo from '../images/storelogo.png';

function ProductAdd(props){



  const addProduct = ()=>{
    props.addProductView()
  }

  return(
    <div className="product-add">
      <div className="product-add-wrapper">
        <img src={data.image} alt="logo"></img>
        <label>{data.name}</label>
        <button onClick={addProduct} className="btn">Add Product</button>
      </div>

    </div>
  )
}

export default React.memo(ProductAdd)
