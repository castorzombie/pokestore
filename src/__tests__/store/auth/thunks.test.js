import { 
    loginWithEmailPassword, 
    logoutFirebase, 
    singInWithGoogle } from '../../../firebase/providers';
import { 
    checkingCredentials, 
    login, 
    logout } from '../../../store/auth';
import { 
    checkingAuthentication, 
    startGoogleSignIn, 
    startLoginWithEmailPassword, 
    startLogout } from '../../../store/auth/thunks';
import { clearNotesLogout } from '../../../store/element/elementSlice';
import { demoUser } from '../../../mocks/fixtures/authFixtures';

jest.mock('../../../firebase/providers');

describe('AuthThunks Tests', () => {
    
    const dispatch = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    test('Should invoque checkingCredentials', async() => {
        
        await checkingAuthentication()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
        
    });

    test('startGoogleSignIn should call checkingCredentials and login - Success', async() => {
        
        const loginData = { ok: true, ...demoUser };

        await singInWithGoogle.mockResolvedValue( loginData );

        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );

        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

    });

    test('startGoogleSignIn should call checkingCredentials and logout - Error', async() => {
        
        const loginData = { ok: false, errorMessage: 'error in Google' };

        await singInWithGoogle.mockResolvedValue( loginData );

        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );

        expect( dispatch ).toHaveBeenCalledWith( logout(loginData.errorMessage) );

    });

    test('startLoginWithEmailPassword should call checkingCredentials login - Success', async() => {
        
        const loginData = { ok: true, ...demoUser };

        const formData = { email: demoUser.email, password: '123456' };

        await loginWithEmailPassword.mockResolvedValue( loginData );

        await startLoginWithEmailPassword(formData)(dispatch);

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );

        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

    });

    test('startLogout should call logoutFirebase, clearNotes and logout', async() => {

        await startLogout()(dispatch);

        expect( logoutFirebase ).toHaveBeenCalled();

        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );

        expect( dispatch ).toHaveBeenCalledWith( logout() );
        
    });
    
});