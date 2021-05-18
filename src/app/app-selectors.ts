import {AppRootStateT} from "./store";


export const selectStatus = (state: AppRootStateT) => state.app.status
export const selectIsInitialized = (state: AppRootStateT) => state.app.isInitialized
export const selectAppError = (state: AppRootStateT) => state.app.error