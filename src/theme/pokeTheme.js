import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const pokeTheme = createTheme({
    palette: {
        primary: {
            main: '#ef5350'
        },
        secondary: {
            main: '#c62828'
        },
        error: {
            main: red.A400
        }
    }
})
