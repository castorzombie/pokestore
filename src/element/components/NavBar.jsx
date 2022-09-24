import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppBar, Grid, IconButton, Toolbar, Box } from '@mui/material';
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { startLogout } from '../../store/auth';
import PokemonList from './PokemonList';
import PokemonSearch from './PokemonSearch';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect } from 'react';
import { useCustomMediaQuery } from '../../hooks';
import useHasChanged from '../../hooks/useHasChanged';

export const NavBar = () => {

    const theme = useTheme();
    const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
    const matchesMD = useMediaQuery(theme.breakpoints.up('md'));
    const dynamicStyles = {
      ...matchesXS && {display: 'flex'},
      ...matchesMD && {display: 'none'}
    }

    const dispatch = useDispatch();
    
    const [ open, setOpen ] = useState( false );

    const [ isMatch ] = useCustomMediaQuery( 'min-width', '899' );

    const isMatchHasChanged = useHasChanged( isMatch );

    useEffect( () => {

        if( isMatchHasChanged ){
            setOpen( isMatch ? true : false );
        }
          
    },[ isMatch, isMatchHasChanged, open, setOpen ]);

    const onLogout = () => {
        dispatch( startLogout() );
    };

    const handleHeader = () => {
        setOpen( current => !current )
    }

    return (
        <AppBar 
            position='fixed'
            >
            <Toolbar>
                <Grid 
                container 
                direction='row' 
                justifyContent='space-between' 
                alignItems='center'>
                    <Grid 
                        xs={6} md={1} 
                        order={{ xs: 1, md: 1 }} 
                        sx={{...dynamicStyles}} item >
                        <Box 
                            justifyContent="flex-start"
                            alignItems="center">
                            <IconButton 
                                style={{ color: 'white'}}
                                onClick={ handleHeader }>
                              <MenuOutlined />
                            </IconButton>
                        </Box>
                    </Grid> 
                    <Grid xs={12} md={2} order={{ xs: 3, md: 2 }} item >
                        <Box 
                        display={ open ? 'flex' : 'none' } 
                        justifyContent="flex-start"
                        alignItems="center">
                            <PokemonSearch />
                        </Box>
                    </Grid>
                    <Grid xs={12} md={8} order={{ xs: 4, md: 3 }} item >
                        <Box 
                        display={ open ? 'flex' : 'none' }  
                        justifyContent="flex-start"
                        alignItems="center">
                            <PokemonList />
                        </Box>
                    </Grid>
                    <Grid xs={6} md={1} order={{ xs: 2, md: 4 }} item >
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
