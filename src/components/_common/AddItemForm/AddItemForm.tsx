import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {AddBox} from "@material-ui/icons";
import {IconButton, TextField} from "@material-ui/core";
import {TextFieldProps} from "@material-ui/core/TextField/TextField";
import styled from "styled-components";

export type AddItemFormPropsType = TextFieldProps & {
    addItem: (title: string) => void
}

// Component
export const AddItemForm = React.memo((props: AddItemFormPropsType) => {

    // Local state
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    // Local functions
    const addItem = () => {
        const itemTitle = title.trim()
        if (itemTitle) {
            props.addItem(itemTitle);
            setTitle('')
        } else {
            setError("Title is required!")
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") addItem()
    }

    return (
        <ComponentWrapper>
            <TextFieldStyled
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                helperText={error}
                fullWidth
                {...props}
            />
            <IconButtonStyled onClick={addItem}>
                <AddBox/>
            </IconButtonStyled>
        </ComponentWrapper>
    )
})

const ComponentWrapper = styled.div`
  position: relative;
  
  display: flex;
  align-items: center;
  width: 100%;
`

const TextFieldStyled = styled(TextField)<any>`
  & label.Mui-focused {
    color: ${({theme}) => theme.color.main};
  }
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: ${({theme}) => theme.color.secondary};
    }
    &:hover fieldset {
      border-color: ${({theme}) => theme.color.main};
    }
    &.Mui-focused fieldset {
      border-color: ${({theme}) => theme.color.main};
`

const IconButtonStyled = styled(IconButton)<any>`
  margin-left: 10px;
  color: ${({theme}) => theme.color.main};
`

// Вучина и грибы
// Хотдог
// Техас