import {createToDoList, ToDoListDomainT, todolistsReducer} from "../todolists-reducer";
import {tasksReducer, TasksStateType} from "../tasks-reducer";

test(`ids should be equals`, () => {
    const startTasksState: TasksStateType = {};
    const startTodoListsState: Array<ToDoListDomainT> = [];

    const newTDL = {
        toDoList: {
            id: '0',
            title: 'new todolist',
            addedDate: '',
            order: 0
        }
    }

    const action = createToDoList.fulfilled(newTDL, 'requestId', {title: newTDL.toDoList.title});

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todolistsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(action.payload.toDoList.id);
    expect(idFromTodoLists).toBe(action.payload.toDoList.id);
});
