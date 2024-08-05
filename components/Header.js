import React from 'react';
import { AppBar, Toolbar, Typography, TextField } from '@mui/material';

const Header = ({ search, setSearch }) => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">
          Rohith's Pantry Checker
        </Typography>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ backgroundColor: 'white', borderRadius: 1 }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
