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

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');
  const JateDb = await openDB('jate', 1);
  const tx = JateDb.transaction('jate', 'readwrite'); // Fixed typo in the store name
  const store = tx.objectStore('jate');
  const request = store.put({id: 1, value: content }); // Ensure that the 'id' field matches the keyPath in the objectStore definition if necessary
  const result = await request?.value 
  console.log('Data saved to the database', result?.value);
  return result;
};

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET all from the database');
  const JateDb = await openDB('jate', 1);
  const tx = JateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
}; 

initdb();
