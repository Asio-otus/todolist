import {
    addTask,
    removeTask, setTasks,
    tasksReducer,
    TasksStateType, updateTask
} from '../tasks-reducer';
import {addToDoList, removeToDoList, setToDoLists} from "../todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../../../api/todolist-api";

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

    const action = removeTask('2', 'todolistId2');

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

// addTask
test('correct task should be added to correct array', () => {

    const action = addTask('juice', {
        description: '',
        title: 'juice',
        status: TaskStatuses.New,
        priority: TaskPriorities.Middle,
        startDate: '',
        deadline: '',
        id: '3',
        todoListId: 'todolistId2',
        order: 0,
        addedDate: ''
    });

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(4);
    expect(endState['todolistId2'][0].id).toBeDefined(); // Check if new task Id is defined because we don't know the Id number (v1) witch is generated by the reducer.
    expect(endState['todolistId2'][0].title).toBe('juice');
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New);
})

// updateTask
test('status of specified task should be changed', () => {


    const action = updateTask('2', {status: TaskStatuses.New}, 'todolistId2');

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed);
    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New);
});

// updateTask
test('title of specified task should be changed', () => {

    const action = updateTask('2', {title: 'beer'}, 'todolistId2');

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][1].title).toBe('JS');
    expect(endState['todolistId2'][1].title).toBe('beer');
});

// addTodolistAC
test(`new array should be added when new todolist is added`, () => {

    const action = addToDoList({
        id: '0',
        title: 'new todolist',
        addedDate: '',
        order: 0
    })

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

    const action = removeToDoList('todolistId2');

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).toBeUndefined();
});

test(`empty arrays should be added when we set todolists`, () => {
    const action = setToDoLists([
        {id: '1', title: 'title 1', order: 0, addedDate: ''},
        {id: '2', title: 'title 2', order: 0, addedDate: ''}
    ])

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])
})

test(`tasks should be added to "To do list"`, () => {
    const action = setTasks(startState['todolistId1'], 'todolistId1')

    const endState = tasksReducer({
        'todolistId1': [],
        'todolistId2': []
    }, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(0)
})
