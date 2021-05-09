import React from "react";
import {AuthForm} from "../components/AuthForm";
import {Redirect} from "react-router-dom";
import {useSelector} from "react-redux";
import {Container} from "../../_shared/_layout/Container";
import styled from "styled-components";
import {selectIsLoggedIn} from "../bll/auth-selectors";

export const LoginPage: React.FC = () => {

    const isLoggedIn = useSelector(selectIsLoggedIn)

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