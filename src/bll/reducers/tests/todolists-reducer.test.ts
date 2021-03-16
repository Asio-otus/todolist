import {v1} from 'uuid';
import {
    addToDoList, changeToDoListEntityStatus, changeToDoListFilter,
    changeToDoListTitle, FilterValuesType,
    removeToDoList, setToDoLists, ToDoListDomainType,
    todolistsReducer
} from '../todolists-reducer';
import {RequestStatusType} from "../app-reducer";

let todolistId1 = v1();
let todolistId2 = v1();
let startState: Array<ToDoListDomainType> = []

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

    const endState = todolistsReducer(startState, removeToDoList(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

// addTodolist
test(`correct todolist should be added`, () => {

    let newTodolistTitle = 'New Todolist';

    const endState = todolistsReducer(startState, addToDoList({
        id: '0',
        title: newTodolistTitle,
        addedDate: '',
        order: 0
    }))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});

// changeTodolistTitle
test(`chosen todolist should change its title`, () => {

    let newTodolistTitle = 'New Todolist';

    const endState = todolistsReducer(startState, changeToDoListTitle(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});

// changeTodolistFilter
test(`correct filter of todolist should be changed`, () => {

    let newFilter: FilterValuesType = 'completed';

    const endState = todolistsReducer(startState, changeToDoListFilter(todolistId2, newFilter));

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});

// changeTodolistFilter
test(`correct todolist entity status should be changed`, () => {

    let newStatus: RequestStatusType = 'succeeded';

    const endState = todolistsReducer(startState, changeToDoListEntityStatus(todolistId2, newStatus));

    expect(endState[0].entityStatus).toBe('idle');
    expect(endState[1].entityStatus).toBe(newStatus);
});

// setToDoLists
test(`todolists should be set to the state`, () => {
    const action = setToDoLists(startState)
    const endState = todolistsReducer([], action);

    expect(endState).toStrictEqual(startState)
})



