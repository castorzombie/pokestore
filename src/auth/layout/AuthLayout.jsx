import { Grid } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';

const ImgBack = {
  backgroundImage: 'url(https://source.unsplash.com/IoYcR-yJ7Sg)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

export const AuthLayout = ({ children, title = '' }) => {
  return (
    <Grid 
      container 
      component="main" 
      sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={ ImgBack }
      />
      <Grid 
        item xs={12} sm={8} md={5} 
        component={Paper} 
        elevation={6} 
        square >
        {children}
      </Grid>
    </Grid>
  )
}
