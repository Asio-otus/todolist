import {addToDoList, ToDoListDomainType, todolistsReducer} from "../todolists-reducer";
import {tasksReducer, TasksStateType} from "../tasks-reducer";

test(`ids should be equals`, () => {
    const startTasksState: TasksStateType = {};
    const startTodoListsState: Array<ToDoListDomainType> = [];

    const action = addToDoList({
        toDoList: {
            id: '0',
            title: 'new todolist',
            addedDate: '',
            order: 0
        }
    });

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todolistsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(action.payload.toDoList.id);
    expect(idFromTodoLists).toBe(action.payload.toDoList.id);
});
