import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";
import styled from "styled-components";

// Component
export const EditableSpan = React.memo((props: EditableSpanPropsType) => {

    // Local state
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)


    // Local functions
    const onEditMode = () => {
        if (!props.disabled) {
            setEditMode(true)
        }
    }
    const offEditMode = () => {
        setEditMode(false)
        if (title.trim()) {
            props.changeTitle(title.trim())
        }
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return (
        editMode
            ? <TextFieldWithoutPadding onBlur={offEditMode}
                                       onChange={changeTitle}
                                       variant={'standard'}
                                       value={title}
                                       autoFocus
                                       disabled={props.disabled}/>
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
})

// Styles
const TextFieldWithoutPadding = styled(TextField)<any>`
  position: relative;

  & .MuiInputBase-input {
    padding: 0;
    font-size: 14px;
  }

  & .MuiInput-underline:before {
    position: absolute;
    top: 20px;
  }

  & .MuiInput-underline:after {
    position: absolute;
    top: 20px;
  }
`

// Types
export type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
    disabled?: boolean
}