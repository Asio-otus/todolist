import React from "react";
import {App} from "./App";
import {ReduxStoreProviderDecorator} from "./storybook/ReduxStoreProviderDecorator";
import {Meta, Story} from "@storybook/react/types-6-0";

export default {
    title: 'Todolist/App',
    component: App,
    argTypes: {},
    decorators: [ReduxStoreProviderDecorator]
} as Meta

const Template: Story = (args) => <App {...args}/>

export const AppExample = Template.bind({})
AppExample.args = {}