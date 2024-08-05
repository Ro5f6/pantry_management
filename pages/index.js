// pages/index.js

import { useState, useEffect } from 'react';
import PantryForm from '../components/PantryForm';
import PantryList from '../components/PantryList';
import Header from '../components/Header'; // Ensure this import is correct
import { collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';

export default function Home() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const querySnapshot = await getDocs(collection(db, 'items'));
    const itemsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setItems(itemsList);
  };

  const handleAddItem = async (itemName, itemQuantity) => {
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.name === itemName);

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + itemQuantity,
        };
        return updatedItems;
      } else {
        return [...prevItems, { name: itemName, quantity: itemQuantity }];
      }
    });
  };

  const handleAddToInventory = async (item) => {
    const itemRef = doc(db, 'items', item.name);
    await updateDoc(itemRef, { quantity: item.quantity + 1 });
    fetchItems();
  };

  const handleRemoveFromInventory = async (item) => {
    const itemRef = doc(db, 'items', item.name);
    if (item.quantity === 1) {
      await deleteDoc(itemRef);
    } else {
      await updateDoc(itemRef, { quantity: item.quantity - 1 });
    }
    fetchItems();
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Header search={search} setSearch={setSearch} />
      <div style={{ marginTop: '20px' }}>
        <PantryForm onAddItem={handleAddItem} />
        <PantryList
          items={filteredItems}
          onAddToInventory={handleAddToInventory}
          onRemoveFromInventory={handleRemoveFromInventory}
        />
      </div>
    </div>
  );
}
