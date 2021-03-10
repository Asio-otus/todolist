import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {AddBox} from "@material-ui/icons";
import {IconButton, TextField} from "@material-ui/core";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
    label: string
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
        <div>
            <TextField
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                helperText={error}
                label={props.label}
                multiline
            />
            <IconButton color={'primary'} onClick={addItem}>
                <AddBox/>
            </IconButton>
        </div>
    )
})