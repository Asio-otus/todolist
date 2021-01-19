import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

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
                label={'Title'}
            />
            <IconButton color={'primary'} onClick={addItem}>
                <AddBox/>
            </IconButton>
        </div>
    )
}