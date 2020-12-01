import React from 'react';
import ProductList from './productList.js';
import ProductCart from './productCart.js'
import ProductAdd from './productAdd.js'
import '../css/mainView.css';
import AddProduct from './addProduct.js';
import uniqueString from 'unique-string';
import IndexedDb from './indexedDb.js';



function MainView(){

  const [addProduct,editAddProduct] = React.useState(-1)
  // productlist
  const [addProductList,editAddProductList] = React.useState([])
  // cart or list data
  const [cart,editCart] = React.useState([]);



  React.useEffect(async()=>{

      // get product list data from indexedDB

      let storeval = await fetchProductListData()
      editAddProductList(storeval);
      editAddProduct(0);



  },[])

  const fetchProductListData = async()=>{

    return new Promise(async(resolve,reject)=>{

      let indexdb = new IndexedDb();
      let storeval = await indexdb.getAllData();

      resolve(storeval);

    })

  }

  const addProductView = React.useCallback(()=>{

      editAddProduct(1)

  },[addProduct])


  // const addProductView = ()=>{
  // }

  const addProductItem = async(val)=>{



     if(val === 'close'){
       editAddProduct(0)
     }
     else{

       let id_gen = uniqueString();
       let new_data = {id:id_gen,...val};

       // add data in indexeddb
       let indx = new IndexedDb();
       await indx.addData(new_data)


       editAddProductList((data)=>{
         return [new_data,...data]
       })

        editAddProduct(0);
     }
  }

  // do not re-render ProductList while you are adding data to cart
  const addCartList = React.useCallback((item)=>{


        editCart(val=>{
          return [...val,item]
        })

  },[addProductList])

  // it is coming from productcart component itself so do not need to memoized

  const cartCached = ()=>{
    editCart([])
  }


  return(
    <React.Fragment>

      {addProduct === -1 && <div><h5>Loading....</h5></div>}

      {addProduct === 0 &&

      <div className="row mainView">


        <div className="col s3 mainView-child c1">
          <ProductAdd addProductView = {addProductView}/>
        </div>

        <div className="col s5 mainView-child">
          <ProductList addCartList={addCartList} addProductList={addProductList}/>
        </div>

        <div className="col s4 mainView-child">
          <ProductCart cartCached={cartCached} cart={cart}/>
        </div>



      </div>



     }

      {addProduct === 1 && <AddProduct addProductItem = {addProductItem}/>}
    </React.Fragment>

  )
}
export default MainView
