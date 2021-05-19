import {TaskPriorities, TaskStatuses, TaskT} from "../../../api/todolist-api";
import {tasksAsyncActions, tasksReducer, TasksStateT} from "./tasks-reducer";
import {todolistAsyncActions} from "../Todolist/todolists-reducer";

let startState: TasksStateT = {}

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
                todolistId: "todolistId1",
                order: 0,
                addedDate: '',
                entityStatus: 'succeeded'
            },
            {
                description: '',
                title: 'JS',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                id: '2',
                todolistId: "todolistId1",
                order: 0,
                addedDate: '',
                entityStatus: 'succeeded'
            },
            {
                description: '',
                title: 'React',
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                id: '3',
                todolistId: "todolistId1",
                order: 0,
                addedDate: '',
                entityStatus: 'succeeded'
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
                todolistId: "todolistId1",
                order: 0,
                addedDate: '',
                entityStatus: 'succeeded'
            },
            {
                description: '',
                title: 'milk',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                id: '2',
                todolistId: "todolistId1",
                order: 0,
                addedDate: '',
                entityStatus: 'succeeded'
            },
            {
                description: '',
                title: 'tea',
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                id: '3',
                todolistId: "todolistId1",
                order: 0,
                addedDate: '',
                entityStatus: 'succeeded'
            }
        ]
    }
})

// removeTaskAC
test(`correct task should be deleted from correct array`, () => {

    const param = {taskId: '2', todolistId: 'todolistId2'};

    const action = tasksAsyncActions.removeTask.fulfilled(param, 'requestId', param);

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
                todolistId: "todolistId1",
                order: 0,
                addedDate: '',
                entityStatus: 'succeeded'
            },
            {
                description: '',
                title: 'JS',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                id: '2',
                todolistId: "todolistId1",
                order: 0,
                addedDate: '',
                entityStatus: 'succeeded'
            },
            {
                description: '',
                title: 'React',
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                id: '3',
                todolistId: "todolistId1",
                order: 0,
                addedDate: '',
                entityStatus: 'succeeded'
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
                todolistId: "todolistId1",
                order: 0,
                addedDate: '',
                entityStatus: 'succeeded'
            },
            {
                description: '',
                title: 'tea',
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                id: '3',
                todolistId: "todolistId1",
                order: 0,
                addedDate: '',
                entityStatus: 'succeeded'
            }
        ]
    });
});

// addTask
test('correct task should be added to correct array', () => {

    const newTask: TaskT = {
        description: '',
        title: 'juice',
        status: TaskStatuses.New,
        priority: TaskPriorities.Middle,
        startDate: '',
        deadline: '',
        id: '3',
        todolistId: 'todolistId2',
        order: 0,
        addedDate: '',
        entityStatus: 'succeeded'
    }

    const action = tasksAsyncActions.addTask.fulfilled({newTask}, 'requestId', {title: newTask.title, todolistId: newTask.todolistId});

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(4);
    expect(endState['todolistId2'][0].id).toBeDefined(); // Check if new task Id is defined because we don't know the Id number (v1) witch is generated by the reducer.
    expect(endState['todolistId2'][0].title).toBe('juice');
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New);
})

// updateTask
test('status of specified task should be changed', () => {

    const task = {taskId: '2', model: {status: TaskStatuses.New}, todolistId: 'todolistId2'}

    const action = tasksAsyncActions.updateTask.fulfilled(task, 'requestId', task);

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed);
    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New);
});

// updateTask
test('title of specified task should be changed', () => {

    const task = {taskId: '2', model: {title: 'beer'}, todolistId: 'todolistId2'}

    const action = tasksAsyncActions.updateTask.fulfilled(task, 'requestId', task);

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][1].title).toBe('JS');
    expect(endState['todolistId2'][1].title).toBe('beer');
});

// addTodolistAC
test(`new array should be added when new todolist is added`, () => {

    let newTodolistTitle = 'New todolist';

    const newTDL = {
        toDoList: {
            id: '0',
            title: newTodolistTitle,
            addedDate: '',
            order: 0
        }
    }

    const endState = tasksReducer(startState, todolistAsyncActions.addTodolist.fulfilled(newTDL, 'requestId', newTodolistTitle))


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

    const action = todolistAsyncActions.removeTodolist.fulfilled({todolistId: 'todolistId2'}, 'requestId', 'todolistId2');

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).toBeUndefined();
});

test(`empty arrays should be added when we set todolists`, () => {
    const action = todolistAsyncActions.fetchTodolists.fulfilled({
        todoLists: [
            {id: '1', title: 'title 1', order: 0, addedDate: ''},
            {id: '2', title: 'title 2', order: 0, addedDate: ''}
        ]
    }, 'requestId')

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])
})

test(`tasks should be added to "To do list"`, () => {
    const action = tasksAsyncActions.fetchTasks.fulfilled({
        tasks: startState['todolistId1'],
        todolistId: 'todolistId1'
    }, 'requestId', 'todolistId1')

    const endState = tasksReducer({
        'todolistId1': [],
        'todolistId2': []
    }, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(0)
})