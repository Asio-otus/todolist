import {createMuiTheme} from "@material-ui/core";


export const theme = createMuiTheme({
    typography: {
        fontFamily: `'Montserrat', san-serif`,
    },
    palette: {
        primary: {
            main: '#fd7029'
        },
        secondary: {
            main: '#2e2f65'
        }
    },
    shape: {
        borderRadius: 0
    },
    overrides: {
        MuiTextField: {
        }
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
    }
})