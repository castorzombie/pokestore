import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';

import { LoginPage } from '../../../auth/pages/LoginPage';
import { authSlice, } from '../../../store/auth';

const mockStartGoogleSignIn = jest.fn();

const mockStartLoginWithEmailPassword = jest.fn();


jest.mock('../../../store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginWithEmailPassword: ({ email, password }) => {
        return () => mockStartLoginWithEmailPassword({ email, password });
    },
}));


jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn(),
}));


const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: {
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: null,
        }
    }
});


describe('Test in <LoginPage />', () => {

    beforeEach(() => jest.clearAllMocks() );


    test('Must show mui component', () => {
        
        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        // screen.debug()
        expect( screen.getAllByText('Login').length ).toBeGreaterThanOrEqual(1);


    });


    test('google btn must call startGoogleSignIn', () => { 

        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const googleBtn = screen.getByLabelText('google-btn');
        fireEvent.click( googleBtn );
        expect( mockStartGoogleSignIn ).toHaveBeenCalled();

    });


    test('submit must call startLoginWithEmailPassword', () => {

        const email    = 'basistestapp@google.com';
        const password = 'basistest1234';

        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const emailField = screen.getByRole('textbox', { name: 'email' });
        fireEvent.change( emailField, { target: { name: 'email', value: email } });
        
        const passwordField = screen.getByTestId('password');
        fireEvent.change( passwordField, { target: { name: 'password', value: password } });
        
        const loginForm = screen.getByLabelText('submit-form');
        fireEvent.submit( loginForm );

        
        expect( mockStartLoginWithEmailPassword ).toHaveBeenCalledWith({
            email: email,
            password: password
        })


    });

    
});
