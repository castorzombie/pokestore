import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startNewNote, startDeletingNote } from '../store/element/thunks';
import { setActiveNote } from '../store/element';
import { useTheme, styled } from '@mui/material/styles';

import {
  Box, 
  OutlinedInput, 
  InputLabel, 
  MenuItem, 
  FormControl, 
  Select, 
  Chip, 
  Checkbox } from '@mui/material';

const ITEM_HEIGHT = 48;

const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 8.5 + ITEM_PADDING_TOP,
      width: 200
    }
  }
};

const sxBoxStyle = { 
  display: 'flex', 
  flexWrap: 'wrap', 
  gap: 0.5 
};

const sxFormStyle = { 
  m: 2,
  /*
  minWidth: '50px',
  '@media (min-width: 780px)' : {
    minWidth: '300px',
  }, */
  width:'100%'
};


const sxSelectStyle = {
  width: '100%',
  '@media (min-width: 899px)' : {
    width: 'auto',
  }, 
  color: "white",
  '.MuiOutlinedInput-notchedOutline': {
    borderColor: '#fff',
    color: 'white'
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#fff',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#fff',
  },
  '.MuiSvgIcon-root ': {
    fill: "white !important",
  }
};

const LabelStyled = styled(InputLabel)( () => ({
  backgroundColor:'transparent', 
  padding:'0 0px 0 0',
  color: 'white'
}));

function getStyles( name, state, theme ) {
  return {
    fontWeight:
      state.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
};

function sxChipStyle( theme, name, active ) {
  return {
    color:theme.primary,
    backgroundColor: active === name ? "red" : "white"
  }
};

export const useSelectPokemons = ( 
  label, 
  notes = [], 
  options ) => {

  const { active } = useSelector( state => state.element );

  const theme = useTheme();

  const [ items, setItems ] = useState([]);

  const [ pokes, setPokes ] = useState([]);

  const dispatch = useDispatch();

  useEffect( () => {
    if( Array.isArray( notes ) ){
      setItems( notes )
    }
  },[ notes ] );

  useEffect( () => {
    if( Array.isArray( options ) ){
      let result = options.filter( o1 => notes.some( o2 => o1.name === o2.name ));
      setPokes(result);
    }
  },[ options, notes] );


  const handleChange = ( event, item ) => {

    const { target: { value } } = event;

    let exist;

    exist = value.find( ( el, i ) => 
      value.find( ( sub, j ) => 
        sub.name === el.name && i !== j ) );
   
    let isDuplicate = exist !== undefined ? true : false;

    isDuplicate ? deleteItem( exist, item ) : addItem( value );

  };

  const addItem = value => {

    setItems( typeof value === 'string' ? value.split(',') : value )

    let { name, url } = value[value.length - 1];

    dispatch( 
      startNewNote(
        name,
        url 
      ) 
    );

  };

  const deleteItem = ( exist, item ) => {

    dispatch(
      startDeletingNote(
        exist
      )
    );

    if( item.props.name === active ) 
      dispatch(
        setActiveNote(
          'bulbasaur'
        )
      );
    
  };

  const isChecked = name => {

    const inDDBB = items.find( item => item.name === name );

    return inDDBB || items.indexOf( name ) > -1 ? true : false;

  };

  const handleActive = ( e, name )  => {
    e.preventDefault()
    dispatch(
      setActiveNote(
        name
      )
    );
  }

  const AvailablePokemons = () => (
      <FormControl 
        sx={ sxFormStyle } 
        style={ pokes.length !== 0 ? { display: 'inline'}: { display: 'none'} } >
        <LabelStyled 
          id={ `input-label-${ label }` } >{ 'pkm' }
        </LabelStyled>
        <Select
          labelId={ `label-${ label }` }
          id={ `multiple-chip-${ label }` }
          multiple
          name={ label }
          value={ items }
          onChange={ ( event, item ) => handleChange( event, item ) }
          input={ 
            <OutlinedInput 
              id={ `select-multiple-chip-${ label }` } 
              label="Chip" 
            /> }
          renderValue={ selected => (
            <Box sx={ sxBoxStyle } >
              { selected.map( value => (
                <Chip
                  key={ value.name }  
                  label={ value.name } 
                  sx={ sxChipStyle(theme, value.name, active) }
                  onMouseDown={ e => e.stopPropagation(e) }
                  clickable={true}
                  onClick={ e => handleActive(e,value.name)}
                />
              )) }
            </Box>
          ) }
          MenuProps={ MenuProps } 
          sx={ sxSelectStyle }>
          { pokes && pokes.map( ( el, index ) => (
            <MenuItem
              key={ index }
              value={ el }
              name={ el.name }
              style={ getStyles( el, items, theme ) }
            >
              <Checkbox 
                checked={ isChecked( el.name ) } />
              { el.name }
            </MenuItem>
            )) }
        </Select>
      </FormControl>
  );

  return [ 
    AvailablePokemons, 
    setItems 
  ]

};