import {AppRootStateT} from "../../app/store";

export const selectIsLoggedIn  = (state: AppRootStateT) => state.auth.isLoggedIn