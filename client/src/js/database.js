import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => { console.log('PUT to the database');
     // Generates a connection to the database
     const traceDb = await openDB('jate', 1);
     //creates new transaction
     const trans = traceDb.transaction('jate', 'readwrite');
     const box = trans.objectStore('jate');
     const ask = box.put({ id: 1, value: content });
     // answers the transaction
     const answer = await ask;
     console.log('saved!', answer); 
};




// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');
    // tracing database and inserting version
    const traceDb = await openDB('jate', 1);
    // New transaction
    const trans = traceDb.transaction('jate');
    const box = trans.objectStore('jate');
    // Gets data in database
    const ask = box.getAll();
    // confirmation
    const answer = await ask;
    console.log('result.value', answer);
    return answer?.value;

};

initdb();
