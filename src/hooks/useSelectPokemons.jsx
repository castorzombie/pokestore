import React  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startDeletingNote } from '../store/element/thunks';
import { setActiveNote } from '../store/element';
import { useTheme, styled } from '@mui/material/styles';
import CancelIcon from '@mui/icons-material/Cancel';
import StarRateIcon from '@mui/icons-material/StarRate';
import {
  Box, 
  OutlinedInput, 
  InputLabel, 
  MenuItem, 
  FormControl, 
  Select, 
  Chip, 
  ListItemText,
  ListItemIcon } from '@mui/material';

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
  notes = [] ) => {

  const { active } = useSelector( state => state.element );

  const theme = useTheme();

  const dispatch = useDispatch();

  const isChecked = name => {
    return name === active ? { color: 'red' } : { color: 'white' }
  };

  const isAvailable = notes => {
    return notes.length !== 0 ? { display: 'inline'}: { display: 'none'} 
  };

  const handleActive = ( e, name )  => {
    e.preventDefault()
    dispatch(
      setActiveNote(
        name
      )
    );
  }

  const handleDelete = ( e, pokemon )  => {

    e.preventDefault()

    const { name } = pokemon;

    dispatch(
      startDeletingNote(
        pokemon
      )
    );

    if( name === active ) 

      dispatch(
        setActiveNote(
          'bulbasaur'
        )
      );
      
  }

  const AvailablePokemons = () => (
    <FormControl 
      sx={ sxFormStyle } 
      style={ isAvailable( notes ) } >
      <LabelStyled 
        id={ `input-label-${ label }` } >{ 'pkm' }
      </LabelStyled>
      <Select
        labelId={ `label-${ label }` }
        id={ `multiple-chip-${ label }` }
        multiple
        name={ label }
        value={ notes }
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
                sx={ sxChipStyle( theme, value.name, active ) }
                onMouseDown={ e => e.stopPropagation(e) }
                clickable={true}
                onClick={ e => handleActive( e, value.name )}
              />
            )) }
          </Box>
        ) }
        MenuProps={ MenuProps } 
        sx={ sxSelectStyle }>
        { notes && notes.map( ( el, index ) => (
          <MenuItem
            key={ index }
            value={ el }
            name={ el.name }
            style={ getStyles( el, notes, theme ) } >
            <ListItemIcon
              onMouseDown={ e => e.stopPropagation(e) }
              onClick={ e => handleDelete( e, el ) }>
              <CancelIcon color="secondary" />
            </ListItemIcon>
            <ListItemIcon 
              onMouseDown={ e => e.stopPropagation(e) }
              onClick={ e => handleActive( e, el.name ) }>
                <StarRateIcon sx={ isChecked( el.name )}  />
            </ListItemIcon>
            <ListItemText>{ el.name }</ListItemText>
          </MenuItem>
          )) }
      </Select>
    </FormControl>
  );

  return [ AvailablePokemons ]

};