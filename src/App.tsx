import React, {useCallback, useEffect} from 'react';
import styled from 'styled-components';
import {ToDoListPage} from "./pages/ToDoListPage/ToDoListPage";
import {CircularProgress, LinearProgress, Button} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./bll/store";
import {initializeApp, RequestStatusType} from "./bll/reducers/app-reducer";
import {Route} from 'react-router-dom';
import {LoginPage} from "./pages/LoginPage/LoginPage";
import {CustomizedSnackbars} from "./components/_common/ErrorSnackbar/ErrorSnackbar";
import {logout} from "./bll/reducers/auth-reducer";

// Component
export const App: React.FC<PropsType> = ({demoMode = false}) => {

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()



    useEffect(() => {
        dispatch(initializeApp())
    }, [])

    const logoutHandler = useCallback(() => {
        dispatch(logout())
    }, [])

    if (!isInitialized) {
        return <CircularProgress/>
    }


    // Render
    return (
        <div>
            <Header>
                {status === 'loading' && <LinearProgressStyled/>}
                {isLoggedIn && <Button onClick={logoutHandler}>Log out</Button>}
            </Header>
            <Route path={'/'} render={() => <ToDoListPage demoMode={demoMode}/>} exact/>
            <Route path={'/login'} render={() => <LoginPage/>}/>
            <CustomizedSnackbars/>
        </div>
    )
}

// Styled components
const Header = styled.header`
  position: relative;
  z-index: 100;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100px;

  background-color: ${({theme}) => theme.palette.primary.main};
`

const LinearProgressStyled = styled(LinearProgress)`
  position: absolute;
  bottom: 0;

  width: 100%;
`

// Types
type PropsType = {
    demoMode?: boolean
}