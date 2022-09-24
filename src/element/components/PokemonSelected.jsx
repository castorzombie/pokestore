import React from 'react';
import { useSelector  } from 'react-redux';
import { useSelectPokemons } from '../../hooks';

const PokemonsSelected = () => {

    const { results } = useSelector( state => state.apis.resourcesList );

    const [ MyPokemons ] = useSelectPokemons ( results );

    return <MyPokemons /> 
        
};

export default PokemonsSelected;