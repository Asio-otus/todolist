import {setAppError, setAppStatus} from "../feature/application/bll/app-reducer";
import {ResponseType} from '../api/todolist-api'
import {Dispatch} from "redux";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppError({error: data.messages[0]}))
    } else {
        dispatch(setAppError({error: 'Sorry. Undefined error have occurred!'}))
    }
    dispatch(setAppStatus({status: 'failed'}))
}

export const handleServerNetworkError = (error: any, dispatch: Dispatch) => {
    dispatch(setAppError(error.message ? error.message : 'Sorry. Undefined error have occurred!'))
    dispatch(setAppStatus({status: 'failed'}))
}