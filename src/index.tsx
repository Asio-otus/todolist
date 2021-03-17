import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {App} from "./App";
import {Provider} from "react-redux";
import {store} from "./bll/store";
import {StylesProvider} from '@material-ui/core/styles';
import {ThemeProvider} from "styled-components";
import {theme} from "./styles/theme";
import {GlobalStyles} from './styles/global';
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
            <GlobalStyles/>
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        </ThemeProvider>
    </StylesProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
