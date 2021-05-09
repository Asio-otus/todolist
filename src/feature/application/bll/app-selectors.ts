import {AppRootStateT} from "../../../bll/store";

export const selectStatus = (state: AppRootStateT) => state.app.status
export const selectIsInitialized = (state: AppRootStateT) => state.app.isInitialized