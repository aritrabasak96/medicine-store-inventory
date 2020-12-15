
function IndexedDb(){

  const databaseName = 'medicinestore';
  const storeName = 'medicine';
  const indexName = 'location';
 // create or open db
  let request = window.indexedDB.open(databaseName,2),
     db,
     tx,
     store,
     index;

 // a callback will trigger when we open or create any database
 request.onupgradeneeded = (e)=>{

   let db = request.result,
             store = db.createObjectStore(storeName,{
              keyPath:"id"
            }),
            index = store.createIndex(indexName,'storeLocation',{unique:false})
  }

  // data should be an object with an id
  this.addData = async(data)=>{


    return new Promise((resolve,reject)=>{

       request.onerror = (e)=>{
          reject('error');
       }

        request.onsuccess = (e)=>{

          db =  request.result;

          db.onerror = (e)=>{

            db.close()
            reject("error")
          }



            tx = db.transaction(storeName,"readwrite");
            store = tx.objectStore(storeName);




            store.put(data);

            resolve("success")

            tx.oncomplete = ()=>{
              db.close()
            }


       }

    })
  }

  this.getAllData = async()=>{


    return new Promise((resolve,reject)=>{

        request.onerror = (e)=>{

          reject('error')
        }

        request.onsuccess = (e)=>{


          db =  request.result;

          db.onerror = (e)=>{

            db.close()
            reject("error")
          }

            tx =  db.transaction(storeName,"readwrite");

            store = tx.objectStore(storeName);

            // get all data
            let query = store.getAll()

            query.onsuccess = (e)=>{
              resolve(query.result)
            }

            query.onerror = ()=>{
              reject('error')
            }


            tx.oncomplete = ()=>{
              db.close()
            }

        }
    })
  }

  this.getSpecificData = async(id)=>{

    return new Promise((resolve,reject)=>{

        request.onerror = (e)=>{

          reject('error')
        }

        request.onsuccess = (e)=>{


          db =  request.result;

          db.onerror = (e)=>{

            db.close()
            reject("error")
          }

            tx =  db.transaction(storeName,"readwrite");

            store = tx.objectStore(storeName);

            // get all data
            let query = store.get(id)

            query.onsuccess = (e)=>{
              resolve(query.result)
            }

            query.onerror = ()=>{
              reject('error')
            }


            tx.oncomplete = ()=>{
              db.close()
            }

        }
    })
  }

  this.deleteData = async(id)=>{

    return new Promise((resolve,reject)=>{

       request.onerror = (e)=>{
          reject('error');
       }

        request.onsuccess = (e)=>{

          db =  request.result;

          db.onerror = (e)=>{

            db.close()
            reject("error")
          }



            tx = db.transaction(storeName,"readwrite");
            store = tx.objectStore(storeName);

            store.delete(id);

            resolve("success")

            tx.oncomplete = ()=>{
              db.close()
            }


       }

    })
  }




}

export default IndexedDb
