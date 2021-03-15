import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";
import styled from "styled-components";

// Component
export const EditableSpan = React.memo((props: EditableSpanPropsType) => {

    // Local state
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    // Local functions
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        if (title.trim()) {
            props.changeTitle(title.trim())
        }
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return (
        editMode
            ? <StyledTextField onBlur={offEditMode}
                               onChange={changeTitle}
                               value={title}
                               fullWidth
                               autoFocus/>
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
})

const StyledTextField = styled(TextField)<any>`
  position: relative;

  & .MuiInputBase-input {
    padding: 0;
  }

  & .MuiInput-underline:before {
    position: absolute;
    top: 20px;
    border-bottom-color: ${({theme}) => theme.color.main};
  }
  
  & .MuiInput-underline:after {
    position: absolute;
    top: 20px;
    border-bottom-color: ${({theme}) => theme.color.main};
  }
`

// Types
export type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}