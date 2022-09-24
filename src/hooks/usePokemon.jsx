import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { Autocomplete, TextField } from '@mui/material';
import { startNewNote } from '../store/element/thunks';
import { styled } from '@mui/material/styles';

const AutocompleteStyled = styled(Autocomplete)( () => ({
    backgroundColor:'', 
    padding:'0',
    color: 'white',
    margin: '16px' 
}));

export const usePokemon = results => {

    const [ pokeList, setPokeList ] = useState([]);

    const [inputValue ] = useState('');

    const dispatch = useDispatch();

    const { notes } = useSelector( state => state.element );

    useEffect( ()=> {
        if( results ){
            const listData = results.map( item => ({ ...item, label: item.name }) )
            setPokeList( listData );
        }
    },[ setPokeList, results ])

    const handleSubmit = ( event, newValue ) => {
        event.preventDefault();
        if( newValue ){
            const duplicate = notes.some( item => item.name === newValue.name );
            if( !duplicate ){
                dispatch( 
                    startNewNote(
                        newValue.name,
                        newValue.url
                    ) 
                );
            }
        }
    };

    const MyPokemon = () => (
        <AutocompleteStyled
            id="controlled-demo"
            value={ inputValue }
            options={ pokeList }
            onChange={ ( event, newValue ) => handleSubmit( event, newValue ) }
            sx={{
                '& input': {
                  width: 200,
                  height: 40,
                  padding: '5px',
                  color: 'white',
                },
            }}
            renderInput={(params) => (
            <TextField
                sx={{ width: 200,}}                 
                {...params} 
                label="Search" 
                variant="standard" />
            )}
        />
    )

    return [ MyPokemon ]

}
