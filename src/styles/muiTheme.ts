import {createMuiTheme} from "@material-ui/core";



export const theme = createMuiTheme({
    // typography: {
    //     fontFamily: `'Montserrat', san-serif`,
    // },
    palette: {
        primary: {
            main: '#e5731b'
        },
        secondary: {
            main: '#4371be'
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