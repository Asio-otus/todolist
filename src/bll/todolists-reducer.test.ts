import {v1} from 'uuid';
import {
    addTodolistAC, changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodoListAC, setToDoListsAC, ToDoListDomainType,
    todolistsReducer
} from './todolists-reducer';

let todolistId1 = v1();
let todolistId2 = v1();
let startState: Array<ToDoListDomainType> = []

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: 'What to learn', addedDate: '', order: 0, filter: 'all'},
        {id: todolistId2, title: 'What to buy', addedDate: '', order: 0, filter: 'all'}
    ]
})

// removeTodoListAC
test(`correct todolist should be removed`, () => {

    const endState = todolistsReducer(startState, removeTodoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

// addTodolistAC
test(`correct todolist should be added`, () => {

    let newTodolistTitle = 'New Todolist';

    const endState = todolistsReducer(startState, addTodolistAC({
        id: '0',
        title: newTodolistTitle,
        addedDate: '',
        order: 0
    }))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});

// changeTodolistTitleAC
test(`chosen todolist should change its title`, () => {

    let newTodolistTitle = 'New Todolist';

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});

// changeTodolistFilterAC
test(`correct filter of todolist should be changed`, () => {

    let newFilter: FilterValuesType = 'completed';

    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, newFilter));

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});

test(`todolists should be set to the state`, () => {
    const action = setToDoListsAC(startState)
    const endState = todolistsReducer([], action);

    expect(endState).toStrictEqual(startState)
})



