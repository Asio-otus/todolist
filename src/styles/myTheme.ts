export type ThemeType = typeof myTheme;

export const myTheme = {
    font: {
        url: `https://fonts.googleapis.com/css2?family=Montserrat:wght@600&family=Roboto&display=swap`,
        family: {
            default: `'Roboto', sans-serif;`,
            montserrat: `'Montserrat', sans-serif;`
        },
        size: {
            default: '16px', // https://type-scale.com/ - Major third
            fs1: '1.25rem', // 20.00px
            fs2: '1.563rem', // 25.00px
            fs3: '1.953rem', // 31.25px
            fs4: '2.441rem', // 39.06px
            fs5: '3.052rem' // 48.83px
        }
    },
    color: {
        main: '#fd7029',
        mainAlt: '#d44b05',
        secondary: '#2e2f65',
        ternary: '#fdd459',
        lightGray: '#fafafa',
        error: '#c11616'
    },
    effect: {
        shadow: '2px 2px 5px #cfcfcf',
        redShadow: '2px 2px 5px #c11616'
    },
    border: {
        size: {
            sm: '5px',
            md: '10px'
        }
    }
}