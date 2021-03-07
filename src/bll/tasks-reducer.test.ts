import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
    TasksStateType
} from './tasks-reducer';
import {addTodolistAC, removeTodoListAC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

let startState: TasksStateType = {}
beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                description: '',
                title: 'HTML&CSS',
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                id: '1',
                todoListId: "todolistId1",
                order: 0,
                addedDate: ''
            },
            {
                description: '',
                title: 'JS',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                id: '2',
                todoListId: "todolistId1",
                order: 0,
                addedDate: ''
            },
            {
                description: '',
                title: 'React',
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                id: '3',
                todoListId: "todolistId1",
                order: 0,
                addedDate: ''
            }
        ],
        'todolistId2': [
            {
                description: '',
                title: 'bread',
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                id: '1',
                todoListId: "todolistId1",
                order: 0,
                addedDate: ''
            },
            {
                description: '',
                title: 'milk',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                id: '2',
                todoListId: "todolistId1",
                order: 0,
                addedDate: ''
            },
            {
                description: '',
                title: 'tea',
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                id: '3',
                todoListId: "todolistId1",
                order: 0,
                addedDate: ''
            }
        ]
    }
})

// removeTaskAC
test(`correct task should be deleted from correct array`, () => {

    const action = removeTaskAC('2', 'todolistId2');

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'].every(t => t.id !== '2')).toBeTruthy() // or we can write: .toBe(true)
    expect(endState).toEqual({
        'todolistId1': [
            {
                description: '',
                title: 'HTML&CSS',
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                id: '1',
                todoListId: "todolistId1",
                order: 0,
                addedDate: ''
            },
            {
                description: '',
                title: 'JS',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                id: '2',
                todoListId: "todolistId1",
                order: 0,
                addedDate: ''
            },
            {
                description: '',
                title: 'React',
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                id: '3',
                todoListId: "todolistId1",
                order: 0,
                addedDate: ''
            }
        ],
        'todolistId2': [
            {
                description: '',
                title: 'bread',
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                id: '1',
                todoListId: "todolistId1",
                order: 0,
                addedDate: ''
            },
            {
                description: '',
                title: 'tea',
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                id: '3',
                todoListId: "todolistId1",
                order: 0,
                addedDate: ''
            }
        ]
    });
});

// addTaskAC
test('correct task should be added to correct array', () => {

    const action = addTaskAC("juice", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(4);
    expect(endState['todolistId2'][0].id).toBeDefined(); // Check if new task Id is defined because we don't know the Id number (v1) witch is generated by the reducer.
    expect(endState['todolistId2'][0].title).toBe('juice');
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New);
})

// changeTaskStatusAC
test('status of specified task should be changed', () => {


    const action = changeTaskStatusAC('2', TaskStatuses.New, 'todolistId2');

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed);
    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New);
});

// changeTaskTitleAC
test('title of specified task should be changed', () => {

    const action = changeTaskTitleAC('2', 'beer', 'todolistId2');

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][1].title).toBe('JS');
    expect(endState['todolistId2'][1].title).toBe('beer');
});

// addTodolistAC
test(`new array should be added when new todolist is added`, () => {

    const action = addTodolistAC('new todolist');

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2');
    if (!newKey) {
        throw Error(`new key should be added`)
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

// removeTodoListAC
test(`property with todolistId should be deleted`, () => {

    const action = removeTodoListAC('todolistId2');

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).toBeUndefined();
});
