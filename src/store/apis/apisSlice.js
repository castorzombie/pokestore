import { createSlice } from '@reduxjs/toolkit';

export const apisSlice = createSlice({
    name: 'apis',
    initialState: {
        resourcesList:[]
    },
    reducers: {
        setResourcesList: ( state, action ) => {
            state.resourcesList = action.payload;
        },
    }
});

export const { 
    setResourcesList,
} = apisSlice.actions;