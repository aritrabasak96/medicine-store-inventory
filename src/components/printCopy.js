import React from 'react';
import '../css/printCopy.css';
import {data} from './storeInfo.js';
import logo from '../images/storelogo.png';
import uniqueString from 'unique-string';
import ReactToPdf from 'react-to-pdf';

function PrintCopy(props){

  const divRef = React.useRef(null);

  const billCancel = ()=>{
    props.cancel()
  }



  return(
    <div className="printCopy">

      <div className="dc-icons">

        <ReactToPdf targetRef={divRef} filename="invoice.pdf" x={0.5} y={0.5} scale={0.8}>
          {({toPdf}) => (
              <label onClick={toPdf}><i className="material-icons">download</i></label>
          )}
       </ReactToPdf>

        <label onClick={billCancel}><i className="material-icons">cancel</i></label>
      </div>

      <div ref={divRef} className="printCopy-wrapper">
        {/* ..... header ..... */}
        <div className="row header-print">
          <div className="col s2">
            <img src={logo}></img>
          </div>

          <div className="col s10">
            <span>Invoice</span>
            <label style={{fontWeight:"bold",fontSize:"18px"}}>{data.name}</label>
            <p>{data.address}</p>
            <label>GSTIN: {data.gstin}</label>
            <label>Ph: {data.phone}</label>
          </div>

        </div>

        {/* .... bill no .... */}
        <div style={{display:"inlineBlock",width:"50%"}}>
          <label style={{fontSize:"16px",color:"black"}}>Bill no: {uniqueString()}</label>
        </div>
        {/* ...... table ......... */}
        <table>
          <tr>
             <th>Name</th>
             <th>Quantity</th>
             <th>MRP</th>
             <th>RATE</th>
             <th>GST</th>
             <th>Total</th>
         </tr>

         {props.cartList.map(val=>{

           return(

             <tr key={uniqueString()}>
               <td>{val.title}</td>
               <td>{val.quantity}</td>
               <td>Rs: {val.mrp}</td>
               <td>Rs: {val.sellingPrice}</td>
               <td>{val.gst}%</td>
               <td>Rs: {val.total}</td>
             </tr>


           )

         })}

        </table>

        {/* ..... total ....... */}
        <div className="info-div total-cal">
          <label>Total Price Rs: {props.totalPrice}</label>
          <label>Discount: {props.discountVal}%</label>
          <label>Total Rs: <span>{props.discountTotalPrice}</span></label>
        </div>

        {/* ...... signature ...... */}
        <div className="info-div signature">
          <label><span>Receiver's Signature:</span></label>
          <label><span>Authorised Signatory:</span></label>
        </div>
      </div>
    </div>
  )
}

export default PrintCopy
