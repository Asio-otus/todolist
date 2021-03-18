import React from "react";
import {Task, TaskPropsType} from "./Task";
import {Meta, Story} from "@storybook/react/types-6-0";
import {action} from "@storybook/addon-actions";
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";
import {v1} from "uuid";
import {ReduxStoreProviderDecorator} from "../../storybook/ReduxStoreProviderDecorator";

export default {
    title: 'Todolist/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
} as Meta

const changeTaskStatusCallback = action('Status changed')
const changeTaskTitleCallback = action('Title changed')
const removeTaskCallback = action('Task removed')

const Template: Story<TaskPropsType> = (args) => <Task {...args}/>

const baseArgs = {
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    removeTask: removeTaskCallback
}

export const TaskIsDoneExample = Template.bind({})
TaskIsDoneExample.args = {
    ...baseArgs,
    task:  {
        description: '',
        title: 'JavaScript',
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Middle,
        startDate: '',
        deadline: '',
        id: v1(),
        todoListId: '0',
        order: 0,
        addedDate: '',
        entityStatus: 'succeeded'
    },
    toDoListId: 'todolistId1'
}

export const TaskIsNotDoneExample = Template.bind({})
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task:  {
        description: '',
        title: 'JavaScript',
        status: TaskStatuses.New,
        priority: TaskPriorities.Middle,
        startDate: '',
        deadline: '',
        id: v1(),
        todoListId: '0',
        order: 0,
        addedDate: '',
        entityStatus: 'succeeded'
    },
    toDoListId: 'todolistId1'
}