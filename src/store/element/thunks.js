import { 
    collection, 
    deleteDoc, 
    doc, 
    setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { addNewEmptyNote, setActiveNote } from './';
import { 
    deleteNoteById, 
    savingNewNote, 
    setNotes, 
} from './elementSlice';
import { loadNotes } from '../../helpers';

export const startNewNote = ( name, url ) => {
    return async( dispatch, getState ) => {

        dispatch( savingNewNote() );

        const { uid } = getState().auth;

        const newPoke = {
            name,
            url
        };

        const newDoc = doc( collection( FirebaseDB, `${ uid }/element/notes`) );

        await setDoc( newDoc, newPoke );

        newPoke.id = newDoc.id;  

        dispatch( 
            addNewEmptyNote( 
                newPoke 
            ) 
        );

        dispatch( 
            setActiveNote( 
                newPoke.name
            )
        );

    }
};

export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {
        
        const { uid } = getState().auth;

        if ( !uid ) throw new Error('User UID not found');

        const notes = await loadNotes( uid );

        dispatch( 
            setNotes( 
                notes
            ) 
        );

    }
};

export const startDeletingNote = note => {
    return async( dispatch, getState) => {

        const { uid } = getState().auth;

        const docRef = doc( FirebaseDB, `${ uid }/element/notes/${ note.id }`);

        await deleteDoc( docRef );

        dispatch( 
            deleteNoteById(
                note.id
            )
        );

    }
};
