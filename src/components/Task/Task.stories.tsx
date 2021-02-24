import React from "react";
import {Task, TaskPropsType} from "./Task";
import {Meta, Story} from "@storybook/react/types-6-0";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Todolist/Task',
    component: Task
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
    task: {id: '1', isDone: true, title: 'JS'},
    toDoListId: 'todolistId1'
}

export const TaskIsNotDoneExample = Template.bind({})
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: {id: '1', isDone: false, title: 'JS'},
    toDoListId: 'todolistId1'
}