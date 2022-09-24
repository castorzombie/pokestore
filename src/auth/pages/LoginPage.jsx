import React, { useMemo } from 'react';
import { 
  useDispatch, 
  useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom'
import { AuthLayout } from '../layout/AuthLayout';
import { 
  startGoogleSignIn, 
  startLoginWithEmailPassword } from '../../store/auth';
import { useForm } from '../../hooks';
import { 
  Alert, 
  Button, 
  Grid, 
  Link, 
  TextField, 
  Typography,
  Box } from '@mui/material';
import { Google } from '@mui/icons-material';


const formData = {
  email: '',
  password: ''
};

export const LoginPage = () => {

  const dispatch = useDispatch();
  
  const { status, errorMessage } = useSelector( state => state.auth );

  const { email, password, onInputChange } = useForm(formData);

  const isAuthenticating = useMemo( () => status === 'checking', [status] );

  const onSubmit = event => {

    event.preventDefault();

    dispatch( 
      startLoginWithEmailPassword({ 
        email, 
        password 
      }) 
    );

  };

  const onGoogleSignIn = () => {

    dispatch( 
      startGoogleSignIn() 
    );

  };

  return (
    <AuthLayout title="Login">
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <form 
          aria-label="submit-form"
          onSubmit={ onSubmit }>
          <Grid container>
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="email" 
                type="email" 
                placeholder='your@mail.com' 
                fullWidth
                name="email"
                value={ email }
                onChange={ onInputChange }
              />
            </Grid>
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Password" 
                type="password" 
                placeholder='Password' 
                fullWidth
                name="password"
                inputProps={{
                  'data-testid': 'password'
                }}
                value={ password }
                onChange={ onInputChange }
              />
            </Grid>
            <Grid 
              container
              display={ !!errorMessage ? '': 'none' }
              sx={{ mt: 1 }}>
              <Grid 
                  item 
                  xs={ 12 }>
                <Alert severity='error'>{ errorMessage }</Alert>
              </Grid>
            </Grid>
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button
                  disabled={ isAuthenticating }
                  type="submit" 
                  variant='contained' 
                  fullWidth>
                  Login
                </Button>
              </Grid>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button
                   disabled={ isAuthenticating }
                   variant='contained' 
                   fullWidth
                   aria-label="google-btn"
                   onClick={ onGoogleSignIn }>
                  <Google />
                  <Typography sx={{ ml: 1 }}>Google</Typography>
                </Button>
              </Grid>
            </Grid>
            <Grid container direction='row' justifyContent='end'>
              <Link component={ RouterLink } color='inherit' to="/auth/register">
                Create your account
              </Link>
            </Grid>

          </Grid>
        </form>
      </Box>
    </AuthLayout>
  )
}
