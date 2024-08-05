import React, { useState } from "react";
import { TextField, Button, Box, Typography, CircularProgress } from "@mui/material";
import { db } from "../lib/firebaseConfig";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";

const PantryForm = ({ onAddItem }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddItem = async () => {
    setLoading(true);
    setError("");

    if (!name || !quantity) {
      setError("Please provide both item name and quantity.");
      setLoading(false);
      return;
    }

    const itemName = name.toLowerCase().trim(); // Normalize item name to lower case
    const itemQuantity = Number(quantity);

    try {
      const itemRef = doc(db, "items", itemName);
      const itemSnap = await getDoc(itemRef);

      if (itemSnap.exists()) {
        // Update existing item
        await updateDoc(itemRef, {
          quantity: Number(itemSnap.data().quantity) + itemQuantity,
        });
      } else {
        // Add new item
        await setDoc(itemRef, {
          name: itemName,
          quantity: itemQuantity,
        });
      }

      // Refresh local state
      await onAddItem(itemName, itemQuantity);

      setName("");
      setQuantity("");
    } catch (error) {
      setError("An error occurred while adding the item.");
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        padding: 2,
        border: '1px solid #ddd',
        borderRadius: 1,
        boxShadow: 1,
        maxWidth: 500,
        margin: '0 auto',
      }}
    >
      <Typography variant="h6">Add a new item</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          alignItems: 'center',
        }}
      >
        <TextField
          label="Item name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          size="small"
          sx={{ flex: 1 }}
        />
        <TextField
          label="Quantity"
          type="number"
          variant="outlined"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          size="small"
          sx={{ flex: 1 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddItem}
          disabled={loading}
          size="small"
          sx={{ height: 'fit-content' }}
        >
          {loading ? <CircularProgress size={24} /> : "Add"}
        </Button>
      </Box>
    </Box>
  );
};

export default PantryForm;
