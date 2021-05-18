import React from "react";
import {App} from "./App";
import {Meta, Story} from "@storybook/react/types-6-0";
import {ReduxStoreProviderDecorator} from "../storybook/ReduxStoreProviderDecorator";

export default {
    title: 'todolist/App',
    component: App,
    argTypes: {},
    decorators: [ReduxStoreProviderDecorator]
} as Meta

const Template: Story = (args) => <App {...args} demoMode={true}/>

export const AppExample = Template.bind({})
AppExample.args = {}