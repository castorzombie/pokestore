import React from 'react';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import PokemonProgress from './PokemonProgress';

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
  
  const GridStats = styled(({...props }) => (
    <Grid 
    item
    xs={8}
    
    alignItems="bottom"
    justifyContent="flex-start"
      {...props} />
  ))`
    padding: 10px 0
  `;

export const PokemonStats = ({ stats }) => {
  return (
    <Grid container spacing={0}>
        { stats && stats.map( ( stat, index ) => {
            return (
                <React.Fragment key={index} >
                    <GridName>{ Object.keys(stat)[0] }</GridName>
                    <GridStats><PokemonProgress progress={ Object.values(stat)[0] } /></GridStats>
                </React.Fragment>
                )
            } ) }
    </Grid>
  )
}
