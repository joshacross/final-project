export function pluralize(name, count) {
  if (count === 1) {
    return name
  }
  return name + 's'
}

export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    // open connection to the db 'shop-shop' with the version of 1
    const request = window.indexedDB.open('shop-shop', 1);

    // create variables to hold reference to the db, transaction (tx), and obj store
    let db, tx, store;

    // if version has changed or first use, run method & create 3 obj stores
    request.onupgradeneeded = function(e) {
      const db = request.result;

      // create obj store for each type of data and set 'primary'
      db.createObjectStore('products', { keyPath: '_id'});
      db.createObjectStore('categories', { keyPath: '_id'});
      db.createObjectStore('cart', { keyPath: '_id'});
    };

    // handle any err with connect
    request.onerror = function(e) {
      console.log('There was an error');
    };

    // on database open success
    request.onsuccess = function(e) {
      // save a reference of the database to the `db` variable
      db = request.result;
      // open a transaction do whatever we pass into `storeName` (must match one of the object store names)
      tx = db.transaction(storeName, 'readwrite');
      // save a reference to that object store
      store = tx.objectStore(storeName);

      // if there's any errors, let us know
      db.onerror = function(e) {
        console.log('error', e);
      };

      // ck what the value of the method is
        // if it's put, get, delete --> overwriting any data with matching id
      switch (method) {
        case 'put':
          store.put(object);
          resolve(object);
          break;
        case 'get':
          const all = store.getAll();
          all.onsuccess = function() {
            resolve(all.result);
          };
          break;
        case 'delete':
          store.delete(object._id);
          break;
        default:
          console.log('No valid method');
          break;
      }

      // when the transaction is complete, close the connection
      tx.oncomplete = function() {
        db.close();
      };
    };

  });
}