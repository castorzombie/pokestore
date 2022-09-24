
import { setResourcesList } from './apisSlice';
import { serviceGet } from "../../api/apiRequest";
import { getEnvironments } from '../../helpers';

const { 
    REACT_APP_POKEAPI_URL } = getEnvironments();

export const configHeaders = {
    'Content-Type': 'application/json, text/plain, */*'
};

export const getServicePokemonList = () => {
    return async dispatch => {

        const url = `${REACT_APP_POKEAPI_URL}pokemon/?limit=150`;

        try {
    
            const response = await serviceGet( url, configHeaders );

            dispatch( 
                setResourcesList( 
                    response.data
                ) 
            );
    
        } catch ( error ) {
                
           return { error: error };
    
        }   

    }
};

export const getSinglePokemon = id => {
    return async dispatch => {

        const url = `${REACT_APP_POKEAPI_URL}pokemon/${id}`;

        try {
    
            const response = await serviceGet( url, configHeaders );

            return response.data 

    
        } catch ( error ) {
                
           return { error: error };
    
        }   

    }
};
