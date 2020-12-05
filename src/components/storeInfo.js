let name = window.localStorage.getItem("store-name"),
    address = window.localStorage.getItem("store-address"),
    gstin =  window.localStorage.getItem("store-gstin"),
    phone =  window.localStorage.getItem("store-phone"),
    image =  window.localStorage.getItem("store-image")


const data = {
  image: image,
  name: name,
  address: address,
  gstin: gstin,
  phone: phone
}

export {data}
