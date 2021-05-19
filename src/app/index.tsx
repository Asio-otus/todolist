import {authAsyncActions, appSlice} from './app-reducer'
import * as appSelectors from './app-selectors'

const appActions = {
    ...authAsyncActions,
    ...appSlice.actions
}

export {
    appActions,
    appSelectors
}