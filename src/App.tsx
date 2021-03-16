import React from 'react';
import styled from 'styled-components';
import {ToDoListPage} from "./pages/ToDoListPage";
import {LinearProgress} from "@material-ui/core";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./bll/store";
import {RequestStatusType} from "./bll/reducers/app-reducer";

// Component
export const App: React.FC<PropsType> = ({demoMode = false}) => {

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    // Render
    return (
        <div>
            <Header>
                {status === 'loading' && <LinearProgressStyled/>}
            </Header>
            <ToDoListPage demoMode={demoMode}/>
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

  background-color: ${({theme}) => theme.color.main};
  box-shadow: ${({theme}) => theme.effect.shadow};
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