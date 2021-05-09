import React from "react";
import {action} from "@storybook/addon-actions";
import {EditableSpan, EditableSpanPropsType} from "./EditableSpan";
import {Meta, Story} from "@storybook/react/types-6-0";
import {ReduxStoreProviderDecorator} from "../../../../storybook/ReduxStoreProviderDecorator";

export default {
    title: 'todolist/EditableSpan',
    component: EditableSpan,
    argTypes: {
        changeTitle: {
            description: 'Value EditableSpan changed'
        },
        title: {
            defaultValue: 'HTML',
            description: 'Start value EditableSpan'
        }
    },
    decorators: [ReduxStoreProviderDecorator]
} as Meta

const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args}/>

export const EditableSpanExample = Template.bind({})
EditableSpanExample.args = {
    changeTitle: action('Value EditableSpan changed'),
}