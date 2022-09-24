import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSinglePokemon } from '../store/apis';
import useHasChanged from '../hooks/useHasChanged';


export const useFetchPokemon = pokemon => {

    const [ favorite, setFavorite ] = useState({
      id:'',
      name:'',
      height:'',
      weight:'',
      abilities:[],
      types: [],
      stats: [],
      img:'',
      pic: '',
      last: ''
    });
  
    const dispatch = useDispatch();

    const { active } = useSelector( state => state.element );

    const activeHasChanged = useHasChanged( active );
  
    const formatData = useCallback(
      res => {
        const { id, name, height, weight, abilities, types, stats, sprites, moves } = res;
        const { front_default } = sprites.other.home;
        const { front_shiny } = sprites;
        const formatAbilities = abilities.map( item => item.ability.name );
        const formatTypes = types.map( item => item.type.name );
        const formatStats = stats.map( item => {
          const { name } = item.stat;
          return { [ name ] : item.base_stat }
        });
        setFavorite({
         ...favorite, 
         id,
         name,
         height,
         weight,
         abilities: formatAbilities,
         types: formatTypes,
         stats: formatStats,
         img: front_default,
         pic: front_shiny,
         last: moves[0].move.name
         });
      }, [ favorite ]);
    
    useEffect( () => {
      if( activeHasChanged && pokemon ){
        dispatch(
            getSinglePokemon( 
            pokemon
          )
        ).then( 
          res => 
            res && formatData( res )          
        )
      }
    },[  activeHasChanged, pokemon, formatData, dispatch ]);
    
        return [ favorite ] ;

}