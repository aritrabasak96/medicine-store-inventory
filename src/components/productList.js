import React from 'react';
import '../css/productList.css';
import IndexedDb from './indexedDb.js';
import ProductListItem from './productListItem.js';
import uniqueString from 'unique-string';


function ProductList(props){

  const [productList,editProductList] = React.useState([]);

  const [searchData,editSearchData] = React.useState('');



  React.useEffect(()=>{


     editProductList(props.addProductList)

  },[])

  const findSearchData = async()=>{

     if(searchData !== ''){
        
      let indx = new IndexedDb();

      // get all data from indexedDB
     let alldata = await indx.getAllData();
 
     // split the search data
     let find_split_data = searchData.substring(0,3);
 
      let result = [];
     // loop through it
     alldata.map(val=>{
 
        // split the title
        let split_title = val.title.substring(0,3);
 
        if(split_title === find_split_data){
 
          result.push(val)
        }
 
 
     })
 
     editProductList(result)

     }

   


  }

  const addCart = (item)=>{
    props.addCartList(item)
  }


  return(
    <div className="product-list-div">

      <div className="product-list-div-wrapper">

      {/* ....... search ...... */}
      <div className="product-list-search">
        <input onChange={(e) => editSearchData(e.target.value)} type="text" placeholder="search by title"></input>
        <button onClick={findSearchData} className="btn-floating waves-effect waves-light"><i className="material-icons">search</i></button>
      </div>

      {/* ........ main body ........... */}
      <div>
        {productList.map(val=>{

          return(
            <div key={uniqueString()}>
              <ProductListItem addCart={addCart} data={val}/>
            </div>
          )

        })}
      </div>

    </div>

    </div>
  )
}

export default React.memo(ProductList)
