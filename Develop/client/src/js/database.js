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
  // Open the database
  const db = await initdb();
  // Use a transaction to perform the database operation
  const tx = db.transaction('jate', 'readwrite');
  // Get the object store
  const store = tx.objectStore('jate');
  // Add the content to the object store
  await store.put({ content });
  // Complete the transaction
  await tx.done;
};

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // Open the database
  const db = await initdb();
  // Use a transaction to perform the database operation
  const tx = db.transaction('jate', 'readonly');
  // Get the object store
  const store = tx.objectStore('jate');
  // Get all content from the object store
  const allContent = await store.getAll();
  // Complete the transaction
  await tx.done;
  // Return all content
  return allContent;
};

initdb();
