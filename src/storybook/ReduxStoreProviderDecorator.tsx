import React from "react";
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "../feature/todolistsList/Task/tasks-reducer";
import {todolistsReducer} from "../feature/todolistsList/Todolist/todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";
import {MuiThemeProvider, StylesProvider} from "@material-ui/core/styles";
import {ThemeProvider} from "styled-components";
import thunk from "redux-thunk";
import {BrowserRouter} from "react-router-dom";
import {theme} from "../styles/theme";
import {CssBaseline} from "@material-ui/core";
import {appReducer} from "../app/app-reducer";
import {AppRootStateT} from "../app/store";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})

const initialGlobalState: AppRootStateT = {
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
                addedDate: '',
                entityStatus: 'succeeded'
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
                addedDate: '',
                entityStatus: 'succeeded'
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
                addedDate: '',
                entityStatus: 'loading'
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
                addedDate: '',
                entityStatus: 'loading'
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
            <MuiThemeProvider theme={theme}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Provider store={storyBookStore}>
                        <BrowserRouter>
                            {storyFn()}
                        </BrowserRouter>
                    </Provider>
                </ThemeProvider>
            </MuiThemeProvider>
        </StylesProvider>
    )
}