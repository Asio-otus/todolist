import {v1} from 'uuid';
import {
    changeToDoListEntityStatus, changeToDoListFilter, createToDoList, deleteToDoList,
    fetchToDoLists, FilterValuesType, ToDoListDomainT,
    todolistsReducer, updateToDoListTitle
} from './todolists-reducer';
import {RequestStatusT} from "../../application/bll/app-reducer";

let todolistId1 = v1();
let todolistId2 = v1();
let startState: Array<ToDoListDomainT> = []

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

    const endState = todolistsReducer(startState, deleteToDoList.fulfilled({todolistId: todolistId1}, 'requestId', {todolistId: todolistId1}))

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

    const endState = todolistsReducer(startState, createToDoList.fulfilled(newTDL, 'requestId' ,{title: newTodolistTitle}))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});

// changeTodolistTitle
test(`chosen todolist should change its title`, () => {

    let newTodolistTitle = 'New todolist';

    const newTDL = {todolistId: todolistId2, title: newTodolistTitle}

    const endState = todolistsReducer(startState, updateToDoListTitle.fulfilled(newTDL, 'requestId', newTDL));

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});

// changeTodolistFilter
test(`correct filter of todolist should be changed`, () => {

    let newFilter: FilterValuesType = 'completed';

    const endState = todolistsReducer(startState, changeToDoListFilter({todolistId: todolistId2, filter: newFilter}));

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
    const action = fetchToDoLists.fulfilled({todoLists: startState}, 'requestId')
    const endState = todolistsReducer([], action);

    expect(endState).toStrictEqual(startState)
})



