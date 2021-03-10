import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

export type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

// Component
export const EditableSpan = React.memo((props: EditableSpanPropsType) => {

    // Local state
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    // Local functions
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        if(title.trim()) {
            props.changeTitle(title.trim())
        }
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return (
        editMode
            ? <TextField onBlur={offEditMode}
                         onChange={changeTitle}
                         value={title}
                         autoFocus/>
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
})