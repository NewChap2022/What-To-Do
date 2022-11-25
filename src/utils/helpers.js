export function idbPromise(storeName, method, object, key) {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open('what-to-do', 1);

        let db, tx, store;

        request.onupgradeneeded = function (e) {
            const db = request.result;
            db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });
        };

        request.onerror = function (e) {
            console.log('There was an error.');
        };

        request.onsuccess = function (e) {
            db = request.result;
            tx = db.transaction(storeName, 'readwrite');
            store = tx.objectStore(storeName);

            db.onerror = function (e) {
                console.log('error', e);
            };

            switch (method) {
                case 'put':
                    const request = store.put(object);
                    request.onsuccess = function(e) {
                        resolve(e.target.result)
                    }
                    break;
                case 'get':
                    const all = store.getAll();
                    all.onsuccess = function () {
                        resolve(all.result);
                    };
                    break;
                case 'delete':
                    store.delete(object.id);
                    break;
                default:
                    console.log('No valid method');
                    break;
            }
            tx.oncomplete = function () {
                db.close();
            }
        }
    })
}