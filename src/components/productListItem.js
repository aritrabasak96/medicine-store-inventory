import React from 'react';
import '../css/productList.css';
import ProductListEdit from './productListEdit.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductListDelete from './productListDelete.js';
import IndexedDb from './indexedDb.js';

function ProductListItem(props){

  const [updateView,editUpdateView] = React.useState(0);
  const [deleteViewItem,editDeleteViewItem] = React.useState(0);
  const [viewDetails,editViewDetails] = React.useState(0);
  const [viewDetailsText,editViewDetailsText] = React.useState('View Details');

  const cancelEdit = (val)=>{

    if(val === 'save'){
      toast.success("Update Successful, Refresh the page")
    }
    editUpdateView(0)
  }

  const cancelDelete = async(val)=>{

    if(val === 'n'){
      editDeleteViewItem(0)
    }
    else{
      // delete data
      const indx = new IndexedDb();
      await indx.deleteData(props.data.id);
      // once delete is completed, delete this item from array
      toast.success("Deleted")
      window.location.reload()

    }
  }

  const addCart = ()=>{
    props.addCart(props.data)

  }

  const viewDetailsClick = ()=>{

    console.log("viewDetailsClick call");
    if(viewDetailsText === "View Details"){
      editViewDetails(1);
      editViewDetailsText("View Less")
    }
    else{
      editViewDetails(0);
      editViewDetailsText("View Details")
    }
  }

  return(
    <div className="product-list-item">
        <ToastContainer />
        {/* ........ name ...... */}
        <h5>{props.data.title}</h5>

         {viewDetails === 1 && <div>

           {/* ...... details .... */}
           <div className="details">
             <label className="icons"><i className="material-icons">note_add</i></label>
             <label>{props.data.description}</label>
           </div>
           {/* ....... money ..... */}
           <div className="money">
               <label className="m0 m1">Product MRP <span>Rs: {props.data.mrp}</span></label>
             <label className="m0 m2">Product Price <span>Rs: {props.data.buyingPrice}</span></label>
             <label className="m0 m3">Product Selling Price <span>Rs: {props.data.sellingPrice}</span></label>
             <label className="m0 m4">Product GST: <span>{props.data.gst} %</span></label>
           </div>
           {/* ..... stock .... */}
           <div className="stock">
             <label>In House Stock: <span>{props.data.stock}</span></label>
             <label>Stock Location (godown): <span>{props.data.stockLocation}</span></label>
             <label>Rack No: <span>{props.data.rackNo}</span></label>
           </div>
           {/* .... delete, add button ... */}
           <div className="add_delete">
             <label onClick={addCart}><i className="material-icons">add_shopping_cart</i></label>
             <label onClick={()=> editUpdateView(1) }><i className="material-icons">create</i></label>
             <label onClick={()=> editDeleteViewItem(1) }><i className="material-icons">delete</i></label>
           </div>

         </div>

          }

          <span onClick={viewDetailsClick} className="vd">{viewDetailsText}</span>


        {updateView === 1 && <div><ProductListEdit cancelEdit={cancelEdit} data={props}/></div>}
         {/* ..... dvi => delete view item ........ */}
        {deleteViewItem === 1 && <div><ProductListDelete cancelDelete={cancelDelete}/></div>}
    </div>
  )
}


export default ProductListItem
