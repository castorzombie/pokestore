import React from 'react';
import { Box } from '@mui/material';
import { NavBar } from '../components';
import { PokemonFavorite } from '../components';
const drawerWidth = 0;

export const PokesLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
        <NavBar drawerWidth={ drawerWidth } />
        <Box 
          component='main'
          sx={{ flexGrow: 1, p: 3, pt: 8 }}>
            <PokemonFavorite />
            { children }
        </Box>
    </Box>
  )
}
