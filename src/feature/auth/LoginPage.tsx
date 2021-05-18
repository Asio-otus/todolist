import React from "react";
import {Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import styled from "styled-components";
import {Container} from "../../styles/layout/Container";
import {AuthForm} from "./AuthForm";
import {authSelectors} from "./index";

export const LoginPage: React.FC = () => {

    const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn)

    if (isLoggedIn) {
        return <Redirect to={'/'}/>
    }

    return (
        <LoginPageWrapper>
            <Container>
                <LoginFormWrapper>
                    <AuthForm/>
                </LoginFormWrapper>
            </Container>
        </LoginPageWrapper>
    )
}

// Styles
const LoginPageWrapper = styled.div`
  height: calc(100vh - 100px);
`

const LoginFormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 200px;
`