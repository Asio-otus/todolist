import React from "react";
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "../bll/reducers/tasks-reducer";
import {todolistsReducer} from "../bll/reducers/todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";
import {AppRootStateType} from "../bll/store";
import {appReducer} from "../bll/reducers/app-reducer";
import {StylesProvider} from "@material-ui/core/styles";
import {theme} from "../styles/theme";
import {ThemeProvider} from "styled-components";
import {GlobalStyles} from "../styles/global";
import thunk from "redux-thunk";
import {App} from "../App";
import {BrowserRouter} from "react-router-dom";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', addedDate: '0', order: 0, filter: 'all', entityStatus: 'idle'},
        {id: 'todolistId2', title: 'What to buy', addedDate: '0', order: 0, filter: 'all', entityStatus: 'loading'}
    ],
    tasks: {
        ['todolistId1']: [
            {
                description: '',
                title: 'HTML&CSS',
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                id: v1(),
                todoListId: "todolistId1",
                order: 0,
                addedDate: ''
            },
            {
                description: '',
                title: 'JavaScript',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.low,
                startDate: '',
                deadline: '',
                id: v1(),
                todoListId: "todolistId1",
                order: 0,
                addedDate: ''
            }
        ],
        ['todolistId2']: [
            {
                description: '',
                title: 'Book',
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                id: v1(),
                todoListId: "todolistId2",
                order: 0,
                addedDate: ''
            },
            {
                description: '',
                title: 'Milk',
                status: TaskStatuses.New,
                priority: TaskPriorities.low,
                startDate: '',
                deadline: '',
                id: v1(),
                todoListId: "todolistId2",
                order: 0,
                addedDate: ''
            }
        ]
    },
    app: {
        status: 'idle',
        error: null,
        isInitialized: true
    },
    auth: {
        isLoggedIn: false
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunk));

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return (
        <StylesProvider injectFirst>
            <ThemeProvider theme={theme}>
                <GlobalStyles/>
                <Provider store={storyBookStore}>
                    <BrowserRouter>
                        {storyFn()}
                    </BrowserRouter>
                </Provider>
            </ThemeProvider>
        </StylesProvider>
    )
}