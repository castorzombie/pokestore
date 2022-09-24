import { 
    authSlice, 
    checkingCredentials, 
    login, 
    logout } from '../../../store/auth/authSlice';

import {
    authenticatedState, 
    demoUser, 
    initialState } from '../../../mocks/fixtures/authFixtures';


describe('authSlice tests', () => {

    test('Must call initial state and to be "auth"', () => {
        
        const state = authSlice.reducer( initialState, {});

        expect( state ).toEqual( initialState );

        expect( authSlice.name ).toBe('auth');

    });

    test('must authenticate', () => {

        const state = authSlice.reducer( initialState, login( demoUser ) );

        expect( state ).toEqual({
            status: 'authenticated',
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null,
        });

    });

    test('should logut without arguments', () => {

        const state = authSlice.reducer( authenticatedState, logout() );

        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined
        });

    });

    test('Should logout and show error message', () => {

        const errorMessage = 'Credentials not correct';

        const state = authSlice.reducer( authenticatedState, logout({ errorMessage }) );

        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage
        });
        
    });

    test('change state status to checking', () => {

        const state = authSlice.reducer( authenticatedState, checkingCredentials() );

        expect( state.status ).toBe('checking');

    });
    
});