import React, {useCallback, useEffect} from 'react';
import styled from 'styled-components';
import {AppBar, Button, LinearProgress} from "@material-ui/core";
import {useSelector} from "react-redux";
import {Redirect, Route, Switch} from 'react-router-dom';
import {InitializationPage} from "./InitializationPage";
import {TodolistsList} from "../feature/todolistsList/TodolistsList";
import {Container} from '../styles/layout/Container';
import {CustomizedSnackbars} from "../components/ErrorSnackbar/ErrorSnackbar";
import {SvgLogo} from "../svg/SvgLogo";
import {LoginPage} from "../feature/auth/LoginPage";
import {appActions, appSelectors} from "./";
import {authActions, authSelectors} from "../feature/auth";
import {useActions} from "./store";


export const App: React.FC<PropsT> = ({demoMode = false}) => {

    const status = useSelector(appSelectors.selectStatus)
    const isInitialized = useSelector(appSelectors.selectIsInitialized)
    const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn)

    const {logout} = useActions(authActions)
    const {initializeApp} = useActions(appActions)

    useEffect(() => {
        initializeApp()
    }, [])

    const logoutHandler = useCallback(() => {
        logout()
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
                        {isLoggedIn &&
                        <Button variant={'contained'} color={'secondary'} onClick={logoutHandler}>Log out</Button>}
                    </AppBarInner>
                </Container>
            </StyledAppBar>
            <Switch>
                <Route exact path={'/'} render={() => <TodolistsList demoMode={demoMode}/>}/>
                <Route path={'/auth'} render={() => <LoginPage/>}/>

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