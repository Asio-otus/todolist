import {AddItemForm, AddItemFormPropsType} from "./AddItemForm";
import React from "react";
import {Meta, Story} from "@storybook/react/types-6-0";

export default {
    title: 'Todolist/AddItemForm',
    component: AddItemForm
} as Meta

const Template: Story<AddItemFormPropsType> = (args) => <AddItemForm {...args}/>

export const AddItemFormExample = Template.bind({})
AddItemFormExample.args = {}