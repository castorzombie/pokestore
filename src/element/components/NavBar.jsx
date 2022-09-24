import { useDispatch } from 'react-redux';
import { AppBar, Grid, IconButton, Toolbar, Box } from '@mui/material';
import { LogoutOutlined } from '@mui/icons-material';
import { startLogout } from '../../store/auth';
import PokemonList from './PokemonList';
import PokemonSearch from './PokemonSearch';

export const NavBar = ({ drawerWidth = 240 }) => {

    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch( startLogout() );
    };

    return (
        <AppBar 
            position='fixed'
            sx={{ 
                width: { sm: `calc(100% - ${ drawerWidth }px)` },
                ml: { sm: `${ drawerWidth }px` }
            }}>
            <Toolbar>
                <Grid 
                container 
                direction='row' 
                justifyContent='space-between' 
                alignItems='center'>
                    <Grid xs={11} item >
                        <Box 
                        display="flex" 
                        justifyContent="flex-start"
                        alignItems="center">
                            <PokemonSearch />
                            <PokemonList />
                        </Box>
                    </Grid>
                    <Grid xs={1} item >
                        <Box 
                            display="flex" 
                            justifyContent="flex-end"
                            alignItems="center">
                            <IconButton 
                                style={{ color: 'white'}}
                                onClick={ onLogout }>
                                <LogoutOutlined />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )

};
