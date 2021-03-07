import {addTodolistAC, ToDoListDomainType, todolistsReducer} from "./todolists-reducer";
import {tasksReducer, TasksStateType} from "./tasks-reducer";

test(`ids should be equals`, () => {
    const startTasksState: TasksStateType = {};
    const startTodoListsState: Array<ToDoListDomainType> = [];

    const action = addTodolistAC('new todolist');

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todolistsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodoLists).toBe(action.todolistId);
});
