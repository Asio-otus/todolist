import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {MuiThemeProvider, StylesProvider} from '@material-ui/core/styles';
import {ThemeProvider} from "styled-components";
import {HashRouter} from "react-router-dom";
import {CssBaseline} from "@material-ui/core";
import {theme} from "./styles/theme";
import {store} from "./app/store";
import {App} from "./app/App";

ReactDOM.render(
    <StylesProvider injectFirst>
        <MuiThemeProvider theme={theme}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Provider store={store}>
                    <HashRouter>
                        <App/>
                    </HashRouter>
                </Provider>
            </ThemeProvider>
        </MuiThemeProvider>
    </StylesProvider>, document.getElementById('root'));

