import React from 'react';
import { Card, Grid, Container } from '@mui/material'
import { useSelector } from 'react-redux';
import { PokemonCard } from './../views'
import { PokesLayout } from '../layout/PokesLayout';
import { useFetchPokemon } from '../../hooks/useFetchPokemon';

export const ListPage = () => {

    const { notes } = useSelector( state => state.element );

    const { active } = useSelector( state => state.element );

    const [ pokemon ] = useFetchPokemon( active );

    return (
      <PokesLayout>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            { notes.map( note => (
              <Grid item key={note.id} xs={12} sm={6} md={4}>
                <Card
                sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column' }} >
                    <PokemonCard key={ note.id } { ...note } /> 
                </Card>
              </Grid>
            )) }
          </Grid>
        </Container>
      </PokesLayout>
    )

};
