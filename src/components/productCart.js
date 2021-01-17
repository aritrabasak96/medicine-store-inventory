import React from 'react';
import ProductCartItem from './productCartItem.js'
import uniqueString from 'unique-string';
import PrintCopy from './printCopy.js'

function ProductCart(props) {

  const [cartList, editCartList] = React.useState([])
  const [totalPrice,editTotalPrice] = React.useState(0);
  const [discountTotalPrice,editDiscountTotalPrice] = React.useState(0);
  const [discountVal,editDisountVal] = React.useState(0);
  const [printCopy,editPrintCopy] = React.useState(0);


  const addToCart = async()=>{


    return new Promise((resolve,reject)=>{

      let new_array = []

      for (let i = 0; i < props.cart.length; i++) {

        let val = props.cart[i];

        // check that the val is already in the new_array or not
        let ind = new_array.findIndex(x => x.id === val.id)

        // not in the actual list
        if (ind === -1) {

          // user can add custom addItem
           //let count = 1
          let count = parseInt(props.cart[i].stock);

          for (let j = i + 1; j < props.cart.length; j++) {

            // if the two products are same
            if (val.id === props.cart[j].id) {
              count = count + parseInt(props.cart[j].stock);
            }
          }
          let {id,title,sellingPrice,gst,mrp} = props.cart[i];
          let total =  ( parseInt(sellingPrice) * ( parseInt(gst) / 100) );
          total = total + parseInt(sellingPrice);
          total = total * count;

          new_array.push({id:id,title:title,mrp:mrp,
            sellingPrice:sellingPrice,gst:gst,quantity:count,total:total})

        }

      }

      editCartList(new_array);
      resolve(new_array)


    })



  }

  const calculateCart = (new_array)=>{


    // get sellingPrice
    // add with gst
    // multiply with quantity
    // add with other products
    let totalPrice_ = 0;

    for(let i=0;i<new_array.length;i++){

      let sellingPrice = parseInt(new_array[i].sellingPrice);
      let gst = parseInt(new_array[i].gst);

      let price_ =  ( sellingPrice * ( gst / 100) ) ;
      price_ = sellingPrice + price_;

      price_ = price_ * new_array[i].quantity

      totalPrice_ = totalPrice_ + price_

    }


    editTotalPrice(totalPrice_);
    editDiscountTotalPrice(totalPrice_);
  }

  const discount = (e)=>{


    let dis =  ( totalPrice *  ( (e.target.value) / 100 ) )
    dis = totalPrice - dis;


    editDiscountTotalPrice(dis);
    editDisountVal(e.target.value);
  }



  const printForm = ()=>{


     editPrintCopy(1)
  }

  const billCancel = ()=>{
    editPrintCopy(0)
  }

  React.useEffect(async() => {


    let new_array = await addToCart();

    calculateCart(new_array);

  },[props])


  const dltItem = (id)=>{


    let new_cart_item = cartList.filter(val=>{
      return val.id !== id
    })

    editCartList(new_cart_item);
  }



  return (<div className="product-cart-div">

    <div className="product-cart-print">
      <div>
        <label onClick={printForm}><i className="material-icons">print</i></label>
        <label onClick={props.cartCached}><i className="material-icons">cached</i></label>
      </div>
    </div>

    <div>
      {cartList.map(val=>{
        return(
          <div key={uniqueString()}>
            <ProductCartItem dltItem={dltItem} data={val}/>
          </div>
        )
      })}
    </div>

      {cartList.length > 0 &&

        <div className="product-cart-result">
          <label>All Total Price Rs: <span>{totalPrice}</span></label>

          <div>
          <label>Give any Discount (in %)</label>
          <input onChange={discount} placeholder="Give any Discounts (%)"></input>
          </div>

          <label>Total Rs: <span>{discountTotalPrice}</span></label>
        </div>


      }

      {printCopy === 1 && <PrintCopy cancel={billCancel} cartList={cartList} totalPrice={totalPrice} discountVal={discountVal} discountTotalPrice={discountTotalPrice} />}

  </div>)


}

export default React.memo(ProductCart)
