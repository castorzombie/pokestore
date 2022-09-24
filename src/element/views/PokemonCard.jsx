import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    Button,
    Card,
    Box,
    CardHeader,
    CardActions, 
    CardMedia,
    Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { setActiveNote } from '../../store/element';

const bodyStyle = { 
    height: '100%', 
    display: 'flex', 
    flexDirection: 'column'
};

export const PokemonCard = ({ 
    name, url }) => {

    const dispatch = useDispatch();

    const [ imagePoke, setImagePoke ] = useState('');

    const { active } = useSelector( state => state.element );

    const theme = useTheme();

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
        <Card
            sx={ bodyStyle } >
            <CardMedia
            component="img"
            sx={{ pt: '16:9', padding:'1rem 5rem 0 5rem' }}
            image={ imagePoke } 
            alt="random"/>
            <CardHeader
                avatar={
                <Avatar sx={{ color: theme.primary }} aria-label="recipe">
                 id
                </Avatar>
                }
                title={name}

            />
            <CardActions disableSpacing>
            <Box 
                display="flex" 
                justifyContent="center"
                alignItems="center"
                style={{ width: '100%'}}>
                <Button
                    onClick={ onClickFavorite }
                    variant={ name === active ? 'contained' : 'outlined' }
                    size="small">Favorite</Button>
            </Box>
            </CardActions>
        </Card>
    )
}