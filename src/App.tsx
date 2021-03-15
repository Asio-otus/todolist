import React, {useCallback} from 'react';
import {AddItemForm} from "./components/_common/AddItemForm/AddItemForm";
import {addToDoListTC} from "./bll/todolists-reducer";
import {useDispatch} from "react-redux";
import {Container} from "./components/_layout/Container";
import styled from 'styled-components';
import {ToDoListPage} from "./pages/ToDoListPage";

// Component
export function App() {
    console.log('App is called')

    const dispatch = useDispatch()

    const addTodoList = useCallback((title: string) => {
        dispatch(addToDoListTC(title))
    }, [])

    // Render
    return (
        <div>
            <Header>
                {/* Not sure If I should keep adding to-dos inside of the header*/}
                <ItemFormWrapper>
                    <AddItemForm addItem={addTodoList} label={'Add to do list'}/>
                </ItemFormWrapper>
            </Header>
            <Container>
                <ToDoListPage/>
            </Container>
        </div>
    )
}

// Styled components
const Header = styled.header`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 30px;

  height: 100px;

  background-color: ${({theme}) => theme.color.lightGray};
  box-shadow: ${({theme}) => theme.effect.shadow};
`

const ItemFormWrapper = styled.div`
  width: 30%;
  min-width: 300px;
`