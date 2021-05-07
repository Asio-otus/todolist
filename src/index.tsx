import React from 'react';
import ReactDOM from 'react-dom';
import {App} from "./App";
import {Provider} from "react-redux";
import {store} from "./bll/store";
import {MuiThemeProvider, StylesProvider} from '@material-ui/core/styles';
import {ThemeProvider} from "styled-components";
import {HashRouter} from "react-router-dom";
import {CssBaseline} from "@material-ui/core";
import {theme} from "./styles/theme";

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

