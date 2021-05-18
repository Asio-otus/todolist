import {useSelector} from "react-redux";
import React, {useCallback, useEffect} from "react";
import {TaskStatuses} from "../../api/todolist-api";
import {Todolist} from "./Todolist/Todolist";
import styled from "styled-components";
import {Redirect} from "react-router-dom";
import {selectTodolists} from "./Todolist/todolist-selectors";
import {selectTasks} from "./Task/tasks-selectors";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Container} from "../../styles/layout/Container";
import {authSelectors} from "../auth";
import {useActions} from "../../app/store";
import {tasksActions, todolistsActions} from "./index";


export const TodolistsList: React.FC<PropsT> = ({demoMode = false}) => {

    const todolists = useSelector(selectTodolists)
    const tasks = useSelector(selectTasks)
    const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn)

    const {fetchTodolists, addTodolist} = useActions(todolistsActions)

    useEffect(() => {
        if (!demoMode || !isLoggedIn) {
            fetchTodolists()
        }
    }, [])

    if (!isLoggedIn) {
        return <Redirect to={'/auth'}/>
    }

    return (
        <>
            <ItemFormContainer>
                <ItemFormWrapper>
                    <AddItemForm addItem={addTodolist} label={'Add to do list'}/>
                </ItemFormWrapper>
            </ItemFormContainer>
            <Container>
                <TodolistContainer>
                    {todolists.map(tl => {
                        let tasksForTodoList = tasks[tl.id]
                        return (
                            <Todolist
                                demoMode={demoMode}
                                key={tl.id}
                                todolist={tl}
                                tasks={tasksForTodoList}
                            />
                        )
                    })}
                </TodolistContainer>
            </Container>
        </>
    )
}


// Styles
const ItemFormContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: ${({theme}) => theme.shadows[4]};

  margin-bottom: 30px;

  width: 100vw;
  height: 100px;
`

const ItemFormWrapper = styled.div`
  width: 30%;
  min-width: 300px;
`

const TodolistContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  // The margin left is negative to compensate for the positive margin of the ToDoListCard... 
  margin-left: -25px;
  height: 100%;

  @media (max-width: 2120px) {
    width: 1620px;
  }

  @media (max-width: 1715px) {
    width: 1215px;
  }

  @media (max-width: 1310px) {
    width: 810px;
  }

  @media (max-width: 905px) {
    width: 405px;
  }
`

// Types
type PropsT = {
    demoMode?: boolean
}