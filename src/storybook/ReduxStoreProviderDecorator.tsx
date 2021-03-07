import React from "react";
import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../bll/tasks-reducer";
import {todolistsReducer} from "../bll/todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";
import {AppRootStateType} from "../bll/store";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', addedDate: '0',  order: 0, filter: 'all'},
        {id: 'todolistId2', title: 'What to buy', addedDate: '0',  order: 0, filter: 'all'}
    ] ,
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
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return (
        <Provider store={storyBookStore}>
            {storyFn()}
        </Provider>
    )
}