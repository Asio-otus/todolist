import React from "react";
import {App} from "./App";
import {Provider} from "react-redux";
import {store} from "./bll/store";
import {ReduxStoreProviderDecorator} from "./storybook/ReduxStoreProviderDecorator";

export default {
    title: 'App Component',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
}

export const AppBaseExample = () => {
    return <>
        <Provider store={store}>
            <App />
        </Provider>
    </>
}