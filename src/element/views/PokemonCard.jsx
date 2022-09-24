import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    Button,
    Card,
    Box,
    CardContent,
    CardMedia,
    Typography } from '@mui/material';
import { setActiveNote } from '../../store/element';


export const PokemonCard = ({ 
    name, url }) => {

    const dispatch = useDispatch();

    const [ imagePoke, setImagePoke ] = useState('');

    const { active } = useSelector( state => state.element );

    useEffect( () => {
        if( url ) {
            let parts = url.split("/");
            let result = parts[parts.length - 2]; 
            setImagePoke(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${result}.png`);
        }
    },[url])

    const onClickFavorite = () => {
        dispatch( 
            setActiveNote( 
                name 
            )
        );
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    };

    return (
        <>
          <Card sx={{ display: 'flex' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h7">
                { name }
              </Typography>
              <Box 
                display="flex" 
                justifyContent="center"
                alignItems="center"
                style={{ width: '100%', marginTop:'10px'}}>
                <Button
                    onClick={ onClickFavorite }
                    variant={ name === active ? 'contained' : 'outlined' }
                    size="small">Favorite</Button>
                </Box>
            </CardContent>
          </Box>
          <CardMedia
            component="img"
            sx={{ pt: '16:9', padding:'.8rem 4.5rem 0 1rem' }}
            image={ imagePoke } 
            alt={ name }
          />
        </Card>
        </>
    )
}