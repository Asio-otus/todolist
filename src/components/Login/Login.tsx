import React from "react";
import {FormControl, FormControlLabel, FormLabel, Checkbox, TextField, Button} from "@material-ui/core";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {login} from "../../bll/reducers/auth-reducer";

type PropsType = {}

export const Login: React.FC<PropsType> = () => {

    const dispatch = useDispatch()

    const formik = useFormik({
        validate: (values) => {
            if (!values.email) {
                return {
                    email: 'Email is required'
                }
            }
            if (!values.password) {
                return {
                    password: 'Password is required'
                }
            }
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
            dispatch(login(values))
        }
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <FormControl>
                <FormLabel/>
                <TextField label='Email' {...formik.getFieldProps('email')}/>
                {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                <TextField label='Password' {...formik.getFieldProps('password')} type='password'/>
                {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                <FormControlLabel label='Remember me'
                                  control={<Checkbox {...formik.getFieldProps('rememberMe')}
                                                           checked={formik.values.rememberMe}
                                                           color='default'/>}/>
                <Button type='submit'>Login</Button>
            </FormControl>
        </form>
    )
}