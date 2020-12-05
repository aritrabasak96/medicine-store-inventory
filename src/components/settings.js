import React from 'react';
import '../css/settings.css';


function Settings(props){

    const [storeInfo,editStoreInfo] = React.useState({name:'',address:'',gstin:'',phone:''});

    const selectImage = (e)=>{

        const fr = new FileReader();

        fr.addEventListener("load",()=>{

            window.localStorage.setItem("store-image",fr.result);

        })

        fr.readAsDataURL(e.target.files[0])
    }

    const changeStoreName = (e)=>{

        editStoreInfo(info=>{
            return {...info,name:e.target.value}
        })
    }

    const changeAddress = (e)=>{

        editStoreInfo(info=>{
            return {...info,address:e.target.value}
        })
    }

    const changeGSTINno = (e)=>{

        editStoreInfo(info=>{
            return {...info,gstin:e.target.value}
        })
    }

    const changePhoneno = (e)=>{

        editStoreInfo(info=>{
            return {...info,phone:e.target.value}
        })
    }

    const saveDetails = ()=>{
        // save data to localstorage
        window.localStorage.setItem("store-name",storeInfo.name)
        window.localStorage.setItem("store-address",storeInfo.address)
        window.localStorage.setItem("store-gstin",storeInfo.gstin)
        window.localStorage.setItem("store-phone",storeInfo.phone)

        props.save('saved')
    }

    const skipDetails = ()=>{
      props.save('skip')
    }

     return(
      <div className="settings">
          <span onClick={skipDetails} className="skip">Skip</span>
        <div className="settings-wrapper">

            <label>Select Your Store Logo</label>
          <input onChange={selectImage} type="file" accept="image/*"></input>

          <label>Enter Store Name</label>
          <input onChange={changeStoreName} type="text" placeholder="Enter Your Store Name"></input>


          <label>Enter Store Address</label>
          <input onChange={changeAddress} type="text" placeholder="Enter Your Store Address"></input>

          <label>Enter GSTIN number</label>
          <input onChange={changeGSTINno} type="text" placeholder="Enter GSTIN number"></input>

          <label>Enter Store Phone number</label>
          <input onChange={changePhoneno} type="text" placeholder="Enter Your Store Phone number"></input>

          <button className="btn" onClick={saveDetails}>Save Details</button>

        </div>
      </div>
     )
}

export default Settings
