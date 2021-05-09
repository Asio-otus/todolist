import {AppRootStateT} from "../../../bll/store";

export const selectIsLoggedIn  = (state: AppRootStateT) => state.auth.isLoggedIn