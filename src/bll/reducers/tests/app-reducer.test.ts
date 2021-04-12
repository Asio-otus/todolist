import {appReducer, InitialStateType, setAppError, setAppStatus} from "../app-reducer";

let startState: InitialStateType

beforeEach(() => {
    startState = {
        status: 'idle',
        error: null,
        isInitialized: false
    }
})

// setAppStatus
test(`correct status should be set`, () => {

    const endState = appReducer(startState, setAppStatus({status: 'loading'}))

    expect(endState.status).toBe('loading');
})

// setAppError
test(`correct error message should be set`, () => {

    const endState = appReducer(startState, setAppError({error: 'Some error'}))

    expect(endState.error).toBe('Some error');
});