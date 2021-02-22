import {AddItemForm} from "./AddItemForm";
import React from "react";
import {action} from "@storybook/addon-actions";

export default {
    title: 'AddItemForm Component',
    component: AddItemForm
}

const callback = action('Add button was pressed inside a form')

export const AddItemFormBaseExample = () => {
     return <AddItemForm addItem={callback}/>
}