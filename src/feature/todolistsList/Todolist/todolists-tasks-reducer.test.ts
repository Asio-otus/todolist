import {todolistAsyncActions, TodolistDomainT, todolistsReducer} from "./todolists-reducer";
import {tasksReducer, TasksStateT} from "../Task/tasks-reducer";

test(`ids should be equals`, () => {
    const startTasksState: TasksStateT = {};
    const startTodoListsState: Array<TodolistDomainT> = [];

    const newTodolist = {
        toDoList: {
            id: '0',
            title: 'new todolist',
            addedDate: '',
            order: 0
        }
    }

    const action = todolistAsyncActions.addTodolist.fulfilled(newTodolist, 'requestId', newTodolist.toDoList.title);

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todolistsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(action.payload.toDoList.id);
    expect(idFromTodoLists).toBe(action.payload.toDoList.id);
});
