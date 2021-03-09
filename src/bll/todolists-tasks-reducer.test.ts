import {addTodolistAC, ToDoListDomainType, todolistsReducer} from "./todolists-reducer";
import {tasksReducer, TasksStateType} from "./tasks-reducer";

test(`ids should be equals`, () => {
    const startTasksState: TasksStateType = {};
    const startTodoListsState: Array<ToDoListDomainType> = [];

    const action = addTodolistAC({
        id: '0',
        title: 'new todolist',
        addedDate: '',
        order: 0
    });

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todolistsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(action.toDoList.id);
    expect(idFromTodoLists).toBe(action.toDoList.id);
});
