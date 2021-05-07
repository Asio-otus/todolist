import {createMuiTheme} from "@material-ui/core";

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#e5731b'
        },
        secondary: {
            main: '#4371be'
        },
        grey: {
            50: '#fafafa',
            100: '#f5f5f5',
            200: '#eeeeee',
            300: '#e0e0e0',
            400: '#bdbdbd',
            500: '#9e9e9e',
            600: '#757575',
            700: '#616161',
            800: '#424242',
            900: '#212121',
        },
        error: {
            main: '#ba1212'
        }
    },
    shape: {
        borderRadius: 0
    },
    props: {
        MuiTextField: {
            fullWidth: true,
            variant: 'outlined',
        },
        MuiCheckbox: {
            color: 'primary'
        },
        MuiButton: {
            variant: 'outlined'
        }
    },
})