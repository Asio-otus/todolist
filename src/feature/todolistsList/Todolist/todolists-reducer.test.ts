import {v1} from 'uuid';
import {
    changeToDoListEntityStatus,
    changeTodolistFilter,
    TodolistFilterValuesT,
    TodolistDomainT,
    todolistsReducer,
    todolistAsyncActions,
} from './todolists-reducer';
import {RequestStatusT} from "../../../app/app-reducer";

let todolistId1 = v1();
let todolistId2 = v1();
let startState: Array<TodolistDomainT> = []

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: 'What to learn', addedDate: '', order: 0, filter: 'all', entityStatus: 'idle'},
        {id: todolistId2, title: 'What to buy', addedDate: '', order: 0, filter: 'all', entityStatus: 'idle'}
    ]
})

// removeTodoList
test(`correct todolist should be removed`, () => {

    const endState = todolistsReducer(startState, todolistAsyncActions.removeTodolist.fulfilled({todolistId: todolistId1}, 'requestId', todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

// addTodolist
test(`correct todolist should be added`, () => {

    let newTodolistTitle = 'New todolist';

    const newTDL = {
        toDoList: {
            id: '0',
            title: newTodolistTitle,
            addedDate: '',
            order: 0
        }
    }

    const endState = todolistsReducer(startState, todolistAsyncActions.addTodolist.fulfilled(newTDL, 'requestId', newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});

// changeTodolistTitle
test(`chosen todolist should change its title`, () => {

    let newTodolistTitle = 'New todolist';

    const newTodolist = {todolistId: todolistId2, title: newTodolistTitle}

    const endState = todolistsReducer(startState, todolistAsyncActions.updateTodolistTitle.fulfilled(newTodolist, 'requestId', newTodolist));

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});

// changeTodolistFilter
test(`correct filter of todolist should be changed`, () => {

    let newFilter: TodolistFilterValuesT = 'completed';

    const endState = todolistsReducer(startState, changeTodolistFilter({todolistId: todolistId2, filter: newFilter}));

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});

// changeTodolistFilter
test(`correct todolist entity status should be changed`, () => {

    let newStatus: RequestStatusT = 'succeeded';

    const endState = todolistsReducer(startState, changeToDoListEntityStatus({
        todolistId: todolistId2,
        status: newStatus
    }));

    expect(endState[0].entityStatus).toBe('idle');
    expect(endState[1].entityStatus).toBe(newStatus);
});

// setToDoLists
test(`todolists should be set to the state`, () => {
    const action = todolistAsyncActions.fetchTodolists.fulfilled({todoLists: startState}, 'requestId')
    const endState = todolistsReducer([], action);

    expect(endState).toStrictEqual(startState)
})



