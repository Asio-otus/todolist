import React, {useCallback, useEffect} from 'react';
import styled from 'styled-components';
import {ToDoListPage} from "./pages/ToDoListPage/ToDoListPage";
import {AppBar, Button, LinearProgress} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateT} from "./bll/store";
import {initializeApp, RequestStatusT} from "./bll/reducers/app-reducer";
import {Redirect, Route, Switch} from 'react-router-dom';
import {LoginPage} from "./pages/LoginPage/LoginPage";
import {CustomizedSnackbars} from "./components/_common/ErrorSnackbar/ErrorSnackbar";
import {logout} from "./bll/reducers/auth-reducer";
import {Container} from "./components/_layout/Container";
import {SvgLogo} from './components/_common/svg/SvgLogo';
import {InitializationPage} from "./pages/InitializationPage/InitializationPage";


export const App: React.FC<PropsT> = ({demoMode = false}) => {

    const status = useSelector<AppRootStateT, RequestStatusT>(state => state.app.status)
    const isInitialized = useSelector<AppRootStateT, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateT, boolean>(state => state.auth.isLoggedIn)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeApp())
    }, [])

    const logoutHandler = useCallback(() => {
        dispatch(logout())
    }, [])

    if (!isInitialized) {
        return <InitializationPage/>
    }

    return (
        <div>
            <StyledAppBar color={'primary'}>
                {status === 'loading' && <LinearProgressStyled color={'secondary'}/>}
                <Container>
                    <AppBarInner>
                        <LogoWrapper>
                            <StyledSvgLogo/>
                            <h1>ToDoList</h1>
                        </LogoWrapper>
                        {isLoggedIn && <Button variant={'contained'} color={'secondary'} onClick={logoutHandler}>Log out</Button>}
                    </AppBarInner>
                </Container>
            </StyledAppBar >
            <Switch>
                <Route exact path={'/'} render={() => <ToDoListPage demoMode={demoMode}/>}/>
                <Route path={'/login'} render={() => <LoginPage/>}/>

                <Route path={'/404'} render={() => <p>Make a 404 page my friend :)</p>}/>
                <Redirect from={'*'} to={'/404'}/>
            </Switch>
            <CustomizedSnackbars/>
        </div>
    )
}

// Styles
const StyledAppBar = styled(AppBar)`
  position: relative;
  z-index: 100;

  display: flex;
  justify-content: center;
  align-items: center;
  
  width: 100%;
  height: 100px;
`

const AppBarInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  width: 100%;
`
const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`

const StyledSvgLogo = styled(SvgLogo)`
  margin-right: 20px;
  
  width: 40px;
  height: 40px;
  
  fill: ${({theme}) => theme.palette.grey[50]};
`

const LinearProgressStyled = styled(LinearProgress)`
  position: absolute;
  bottom: 0;

  width: 100%;
`

// Types
type PropsT = {
    demoMode?: boolean
}