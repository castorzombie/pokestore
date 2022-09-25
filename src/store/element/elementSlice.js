import { createSlice } from '@reduxjs/toolkit';

export const elementSlice = createSlice({
    name: 'element',
    initialState: {
        isSaving: false,
        messageSaved: '',
        messageDeleted: '',
        notes: [],
        active: '',
    },
    reducers: {
        savingNewNote: state => {
            state.isSaving = true;
        },
        addNewEmptyNote: ( state, action ) => {
            state.notes.push( action.payload );
            state.isSaving = false;
        },
        setActiveNote: ( state, action ) => {
            state.active = action.payload;
            state.messageSaved = '';
        },
        setNotes: ( state, action ) => {
            state.notes = action.payload;
        },
        clearNotesLogout: state => {
            state.isSaving = false;
            state.messageSaved = '';
            state.messageDeleted = '';
            state.notes = [];
            state.active = null;
        },
        deleteNoteById: ( state, action ) => {
            state.notes = state.notes.filter( note => note.id !== action.payload );
            state.messageDeleted = `deleted`;
        },
    }
});

export const { 
    setElementsList,
    addNewEmptyNote,
    clearNotesLogout,
    deleteNoteById, 
    savingNewNote,
    setActiveNote,
    setNotes,
} = elementSlice.actions;