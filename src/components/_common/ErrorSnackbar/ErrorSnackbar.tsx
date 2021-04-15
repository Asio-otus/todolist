import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateT} from "../../../bll/store";
import {setAppError} from "../../../bll/reducers/app-reducer";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function CustomizedSnackbars() {

    const error = useSelector<AppRootStateT, string | null>(state => state.app.error)
    const dispatch = useDispatch()

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        // Prevents closing the error message on mouse click away.
        if (reason === 'clickaway') {
            return;
        }

        dispatch(setAppError({error: null}))
    };

    const isOpen = error !== null

    return (
        <Snackbar open={isOpen} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                {error}
            </Alert>
        </Snackbar>
    );
}

// Cheat shit for severity
// <Alert severity="error">This is an error message!</Alert>
// <Alert severity="warning">This is a warning message!</Alert>
// <Alert severity="info">This is an information message!</Alert>
// <Alert severity="success">This is a success message!</Alert>