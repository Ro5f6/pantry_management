import React from "react";
import { Grid, Card, Typography, Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Image from 'next/image'; // Import next/image
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../lib/firebaseConfig";

// Image mapping
const imageMap = {
  'milk': '/images/milk.jpeg',
  'bell pepper': '/images/bell pepper.webp',
  'broccoli': '/images/broccoli.webp',
  'eggs': '/images/eggs.webp',
  'monster': '/images/monster.webp',
  'mountain dew': '/images/mountain dew.webp',
  'onion': '/images/onion.webp',
  'pork': '/images/pork.webp',
  'potatoes': '/images/potatoes.webp',
  'tomatoes': '/images/tomatoes.webp',
  'whole chicken': '/images/whole chicken.webp',
  'lays': '/images/lays.jpeg',

  // Add more mappings as needed
};

const PantryList = ({ items, onAddToInventory, onRemoveFromInventory }) => {
  const handleQuantityChange = async (item, change) => {
    const itemRef = doc(db, "items", item.id);
    const newQuantity = item.quantity + change;

    if (newQuantity < 1) {
      await deleteDoc(itemRef); // Remove item if quantity drops below 1
    } else {
      await updateDoc(itemRef, { quantity: newQuantity });
    }

    onRemoveFromInventory(item); // Refresh the items list
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2}>
        {items.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
            <Card sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '300px' }}>
              {imageMap[item.name] ? (
                <Image
                  src={imageMap[item.name]}
                  alt={item.name}
                  width={100} // Adjust as needed
                  height={100} // Adjust as needed
                  style={{ marginBottom: '10px' }}
                />
              ) : (
                <Box sx={{ width: 100, height: 100, backgroundColor: '#f0f0f0', marginBottom: '10px' }} /> // Placeholder for missing images
              )}
              <Typography variant="h6" sx={{ fontSize: '1.2rem', textAlign: 'center', marginBottom: '8px' }}>
                {item.name}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1rem', marginBottom: '8px' }}>
                Qty: {item.quantity}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton onClick={() => onAddToInventory(item)}>
                  <AddIcon />
                </IconButton>
                <IconButton onClick={() => handleQuantityChange(item, -1)}>
                  <RemoveIcon />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PantryList;
