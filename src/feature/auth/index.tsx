import {authAsyncActions, authSlice} from "./auth-reducer";
import * as authSelectors from './auth-selectors'

const authActions = {
    ...authAsyncActions,
    ...authSlice.actions
}

export {
    authActions,
    authSelectors
}