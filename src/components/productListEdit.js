import React from 'react';
import '../css/productListEdit.css';
import IndexedDb from './indexedDb.js';

function ProductListEdit(props){

  const [editData,changeEditData] = React.useState({id:props.data.data.id,
  title:props.data.data.title,description:props.data.data.description,
  buyingPrice:props.data.data.buyingPrice,sellingPrice:props.data.data.sellingPrice,
  gst:props.data.data.gst,stock:props.data.data.stock,stockLocation:props.data.data.stockLocation,
  rackNo:props.data.data.rackNo})

  const saveUpdate = async()=>{

    console.log('editdata----',editData)
    const indx = new IndexedDb();
    await indx.addData(editData);
    // when you save the data cancel the view
    props.cancelEdit('save');
  }


  return(

    <div className="product-list-edit">

    <span onClick={()=> props.cancelEdit()} className="cancel"><i className="material-icons">cancel</i></span>

    <div className="product-list-edit-wrapper">

      {/* ........ name ...... */}
      <h5>{props.data.data.title}</h5>
      <input onChange={(e)=> changeEditData( (val) => { return {...val,title:e.target.value} } )} type="text" placeholder="Edit title"></input>

      {/* ...... details .... */}
      <div className="details">
        <label className="icons"><i className="material-icons">note_add</i></label>
        <label>{props.data.data.description}</label>
        <input onChange={(e)=> changeEditData( (val) => { return {...val,description:e.target.value} } )} type="text" placeholder="Edit description"></input>
      </div>

      {/* ....... money ..... */}
      <div className="money">
        <label className="m0 m1">Product Price Rs: {props.data.data.buyingPrice}</label>
        <input onChange={(e)=> changeEditData( (val) => { return {...val,buyingPrice:e.target.value} } )} type="number" placeholder="Edit price"></input>
        <label className="m0 m2">Product Selling Price Rs: {props.data.data.sellingPrice}</label>
        <input onChange={(e)=> changeEditData( (val) => { return {...val,sellingPrice:e.target.value} } )} type="number" placeholder="Edit selling price"></input>
        <label className="m0 m3">Product GST: {props.data.data.gst} %</label>
        <input onChange={(e)=> changeEditData( (val) => { return {...val,gst:e.target.value} } )} type="number" placeholder="Edit GST"></input>
      </div>
      {/* ..... stock .... */}
      <div className="stock">
        <label>In House Stock: <span>{props.data.data.stock}</span></label>
        <input onChange={(e)=> changeEditData( (val) => { return {...val,stock:e.target.value} } )} type="number" placeholder="Edit stock"></input>
        <label>Stock Location (godown): <span>{props.data.data.stockLocation}</span></label>
        <input onChange={(e)=> changeEditData( (val) => { return {...val,stockLocation:e.target.value} } )} type="text" placeholder="Edit stockLocation"></input>
        <label>Rack No: <span>{props.data.data.rackNo}</span></label>
        <input onChange={(e)=> changeEditData((val) => { return {...val,rackNo:e.target.value} } )} type="text" placeholder="Edit rackno"></input>
      </div>

      <button onClick={saveUpdate} className="btn">Update and Save</button>
    </div>
  </div>
  )
}

export default ProductListEdit
