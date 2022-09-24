import React, { useEffect, useRef } from 'react';
import { setActiveNote } from '../../store/element/elementSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useFetchPokemon } from '../../hooks';
import { Grid, Container, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { PokemonStats } from './PokemonStats';
import { PokemonChip } from './PokemonChip';

const GridName = styled(({...props }) => (
  <Grid 
    item
    xs={4}
    container
    direction="row"
    alignItems="center"
    justifyContent="flex-end"
    {...props} />
))`
  padding: 10px
`;

const GridFigure = styled(({...props }) => (
  <Grid 
    item
    xs={8}
    container
    direction="row"
    alignItems="center"
    justifyContent="flex-start"
    {...props} />
))`
  padding: 10px
`;

export const PokemonFavorite = () => {

  const { active } = useSelector( state => state.element );

  const [ favorite ] = useFetchPokemon( active );

  const dispatch = useDispatch();
  
  const calledOnce = useRef( false );

  useEffect( () => {
    if (calledOnce.current) {
      return;
    }else{
      calledOnce.current = true;
      dispatch(
        setActiveNote(
          'bulbasaur'
        )
      )
    }
  },[dispatch] );
  
  return (
    <Container 
      sx={{ py: 8 }} 
      maxWidth="md">
    <Grid 
      container 
      spacing={0}>
    <Grid item xs={12} md={6}>
      <Box
        display="flex"
        justifyContent="flex-end"
        sx={{height: '100%'}}
        alignItems="center" >
          <Typography 
            variant="h2" 
            component="h2" 
            color="secondary">
             {favorite.name}
          </Typography>
      </Box>
    </Grid>
    <Grid item xs={12} md={6}>
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center">
          <img 
            style={{ width: '70%', marginTop: '-40px'}} 
            src={favorite.img} 
            alt={favorite.name} />
      </Box>
    </Grid>
    <Grid item xs={6}>
      <Grid container spacing={0}>
        <GridName>ID</GridName>
        <GridFigure> {favorite.id} </GridFigure>
        <GridName>HEIGHT</GridName>
        <GridFigure> {favorite.height} </GridFigure>
        <GridName>WEIGHT</GridName>
        <GridFigure> {favorite.weight} </GridFigure>
        <GridName>ABILITIES</GridName>
        <GridFigure>
          <PokemonChip chips={favorite.abilities}/>
        </GridFigure>
        <GridName>TYPE</GridName>
        <GridFigure>
        <PokemonChip chips={favorite.types} />
        </GridFigure>
      </Grid>
    </Grid>
    <Grid item xs={6}>
      <PokemonStats stats={favorite.stats} />
    </Grid>
  </Grid>
  </Container>
  )
}
