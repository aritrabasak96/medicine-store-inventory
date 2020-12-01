import React from 'react';

function ProductListDelete(props){

  return(
    <div className="delete-list">
      <div className="delete-list-wrapper">
        <label>Are You Sure You Want To Delete This Item?</label>
        <button onClick={()=> props.cancelDelete('y')}  className="btn">Yes</button>
        <button onClick={()=> props.cancelDelete('n')} className="btn">No</button>
      </div>
    </div>
  )
}

export default ProductListDelete
