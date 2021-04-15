import React from "react";
import {Login} from "../../components/Login/Login";
import {Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppRootStateT} from "../../bll/store";
import {Container} from "../../components/_layout/Container";
import styled from "styled-components";

type PropsType = {}

export const LoginPage: React.FC<PropsType> = () => {

    const isLoggedIn = useSelector<AppRootStateT, boolean>(state => state.auth.isLoggedIn)

    if (isLoggedIn) {
        return <Redirect to={'/'}/>
    }

    return (
        <LoginPageWrapper>
            <Container>
                <LoginFormWrapper>
                    <Login/>
                </LoginFormWrapper>
            </Container>
        </LoginPageWrapper>
    )
}

const LoginPageWrapper = styled.div`
  height: calc(100vh - 100px);
`

const LoginFormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  margin-bottom: 200px;
`