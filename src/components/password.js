import React,{useEffect} from 'react'
import '../css/password.css';
import axios from 'axios';

function Password(props){

  const [password,editPassword] = React.useState('');
  const [message,editMessage] = React.useState('Enter The Password: 1234');

  //let gimicPass = '123789';

  const changePassword = (e)=>{
    editPassword(e.target.value)
  }

  const verifyPassword = ()=>{

    editMessage('Please wait...');

    if(password === '1234'){
      props.verify('y')
    }
  }

  return(
    <div className="password">
      <div className="password-wrapper">
        <h3>{message}</h3>
        <input onChange={changePassword} type="text" placeholder="Enter password"></input>
        <button className="btn" onClick={verifyPassword}>Login</button>
      </div>
    </div>
  )
}

export default Password
