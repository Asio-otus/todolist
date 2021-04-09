import {CircularProgress} from "@material-ui/core";
import React from "react";
import styled from "styled-components";

export const InitializationPage = () => {
    return (
        <PageWrapper>
            <CircularProgress/>
        </PageWrapper>
    )
}

// Styles
const PageWrapper = styled.div`
  position: absolute;
  z-index: 100;
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  width: 100vw;
  height: 100vh;
  
  background-color: ${({theme}) => theme.palette.grey['50']};
`