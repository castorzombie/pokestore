import React from 'react';
import { useSelector  } from 'react-redux';
import { useSelectPokemons } from '../../hooks';

const PokemonList = () => {

    const { results } = useSelector( state => state.apis.resourcesList );

    const { notes } = useSelector( state => state.element );

    const [ AvailablePokemons ] = useSelectPokemons ( 
                                    "Pokemons", 
                                    notes, 
                                    results );

    return <AvailablePokemons /> 
        
};

export default PokemonList;