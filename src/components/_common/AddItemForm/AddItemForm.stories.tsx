import {AddItemForm, AddItemFormPropsType} from "./AddItemForm";
import React from "react";
import {Meta, Story} from "@storybook/react/types-6-0";
import {ReduxStoreProviderDecorator} from "../../../storybook/ReduxStoreProviderDecorator";

export default {
    title: 'Todolist/AddItemForm',
    component: AddItemForm,
    decorators: [ReduxStoreProviderDecorator]
} as Meta

const Template: Story<AddItemFormPropsType> = (args) => <AddItemForm {...args}/>

export const AddItemFormExample = Template.bind({})
AddItemFormExample.args = {}

export const AddItemFormDisabledExample = Template.bind({})
AddItemFormDisabledExample.args = {
    disabled: true
}