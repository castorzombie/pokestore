import React from 'react';
import { useSelector  } from 'react-redux';
import { usePokemon } from '../../hooks';


const PokemonSearch = () => {

    const { results } = useSelector( state => state.apis.resourcesList );

    const [ MyPokemon ] = usePokemon( results );

    return <MyPokemon /> 
        
};

export default PokemonSearch;