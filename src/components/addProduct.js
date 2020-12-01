import React from 'react'
import '../css/addProduct.css';


function AddProduct(props){

  // value store as string
  const [allProducts,editAllProducts] = React.useState({title:'',description:'no details added',mrp:'',buyingPrice:'0',sellingPrice:'0',gst:'',stockLocation:'',rackNo:'',stock:'0'})
  const [projectedPrice,editProjectedPrice] = React.useState(0.0);

  const close = ()=>{

     props.addProductItem('close')
  }

  const editTitle = (e)=>{
    editAllProducts((val)=>{
      return {...val,title:e.target.value}
    })
  }

  const editDescription = (e)=>{
    editAllProducts((val)=>{
      return {...val,description:e.target.value}
    })
  }

  const editMRP = (e)=>{
    editAllProducts((val)=>{
      return {...val,mrp:e.target.value}
    })
  }

  const editBuyingPrice = (e)=>{
    editAllProducts((val)=>{
      return {...val,buyingPrice:e.target.value}
    })
  }

  const editSellingPrice = (e)=>{
    editAllProducts((val)=>{
      return {...val,sellingPrice:e.target.value}
    })
  }

  const editGST = (e)=>{
    editAllProducts((val)=>{
      return {...val,gst:e.target.value}
    })

    // with gst price
    let gst_price = ( parseInt(allProducts.sellingPrice) * ( e.target.value / 100 ) )
    gst_price = parseInt(allProducts.sellingPrice) + gst_price

    editProjectedPrice(gst_price);
  }

  const editStockLocation = (e)=>{
    editAllProducts((val)=>{
      return {...val,stockLocation:e.target.value}
    })
  }

  const editRackNo = (e)=>{
    editAllProducts((val)=>{
      return {...val,rackNo:e.target.value}
    })
  }

  const editStock = (e)=>{
    editAllProducts((val)=>{
      return {...val,stock:e.target.value}
    })
  }

  const saveItem = ()=>{

     props.addProductItem(allProducts)
  }

  return(
    <div className="add-product">


      <div className="add-product-wrapper">

        <div onClick={close}  className="cancel">
          <i  className="material-icons">cancel</i>
        </div>


        <div>
          <label>Product Title</label>
          <input onChange={editTitle}  type="text" placeholder="Product name or title"></input>
        </div>

        <div>
          <label>Product Description</label>
          <input onChange={editDescription} type="text" placeholder="Add some details of that product"></input>
        </div>

        <div>
          <label>Product MRP (Rs:)</label>
          <input onChange={editMRP} type="number" placeholder="Add Maximum Retail Price"></input>
        </div>

        <div>
          <label>Product Price (Rs:)</label>
          <input onChange={editBuyingPrice} type="number" placeholder="Product Market price"></input>
        </div>

        <div>
          <label>Product Selling Price (Rs:)</label>
          <input onChange={editSellingPrice} type="number" placeholder="Product selling price"></input>
        </div>

        <div>
          <label>GST (%)</label>
          <input onChange={editGST} type="number" placeholder="Product GST (CGST + SGST)"></input>
        </div>

        <div>
          <span className="projectedPrice">Price with GST Rs: {projectedPrice}</span>
        </div>

        <div>
          <label>Product Stock Location (godown)</label>
          <input onChange={editStockLocation} type="text" placeholder="Product stock Location"></input>
        </div>

        <div>
          <label>Rack Number</label>
          <input onChange={editRackNo} type="text" placeholder="Rack number"></input>
        </div>

        <div>
          <label>Total Stock Available</label>
          <input onChange={editStock} type="number" placeholder="Total stock Available"></input>
        </div>

        <button onClick={saveItem} className="btn">Save This Item</button>
      </div>
    </div>
  )
}

export default AddProduct
