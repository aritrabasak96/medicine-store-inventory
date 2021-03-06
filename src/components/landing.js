import React,{useEffect} from 'react';
import Password from './password';
import MainView from './mainView.js';
import '../css/landing.css';
import Settings from './settings.js';

function Landing(){

  // first state to check that the user has successfully login
  const [login,editLogin] = React.useState(-1) // -1 => first time 0=> no login 1=> login set
  const [view,editView] = React.useState(-1);
  // check login credentials
  useEffect(()=>{

        checkWindow();



        window.addEventListener("resize",()=>{


          checkWindow();
        })


  },[])

  const checkWindow = ()=>{
     // first check the mobiel view or not
     let view = window.innerWidth;

     // desktop
     if(view > 900){

       let login = window.localStorage.getItem('ulogin');  // ulogin = 0 => nologin, 1=> login

       // first time
       // no login
       if(login === null){
         editLogin(0)
       }
       else{
         // no login
         if(parseInt(login) !== 1){
           editLogin(0)
         }
         else{
           // login
           editLogin(2)
         }
       }

        editView(1);

     }
     // mobile view
     else{
       editView(0)
     }

  }


  const verifyPassword = (val)=>{
    if(val === 'y'){

       editLogin(1)
        window.localStorage.setItem("ulogin",1)
    }

  }

  const logout = ()=>{
    window.localStorage.setItem("ulogin",0)
    window.location.reload();
  }

  const saveStoreInfo = (val)=>{

    editLogin(2);
  }

  const setting = ()=>{
    editLogin(1);
  }

  const refreshBrowser = ()=>{
    window.location.reload();
  }

  return(
    <div>

      {view === 1 && <div>

        <div className="header">

         <div className="refresh">
           <label onClick={refreshBrowser}><i className="material-icons">refresh</i></label>
         </div>

          <div>
            <label>@TreazerDigitise</label>
            <label onClick={setting}>Setting</label>
            <label onClick={logout}>Logout</label>
          </div>

        </div>


        {login === 2 && <div style={{width:'80%',margin:'0px auto'}}>

            <MainView/>

        </div>}

        {login === 0 && <div>
           <Password verify={verifyPassword}/>
        </div>}

        {login === 1 && <div>
           <Settings save={saveStoreInfo}/>
        </div>}




        </div>

      }

      {view === 0 &&

          <div>
            <h5>Mobile View Is not Available, open in Desktop</h5>
          </div>
      }


    </div>
  )
}

export default Landing
