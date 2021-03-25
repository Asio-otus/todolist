import React from "react";
import {FormControl, FormControlLabel, FormLabel, Checkbox, TextField, Button} from "@material-ui/core";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {login} from "../../bll/reducers/auth-reducer";
import styled from "styled-components";

type PropsType = {}

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login: React.FC<PropsType> = () => {

    const dispatch = useDispatch()

    const formik = useFormik({

        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Email is required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = 'Password is required'
            } else if (values.password.length < 3) {
                errors.password = 'Password must be higher then 3'
            }
            return errors
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
        <StyledForm onSubmit={formik.handleSubmit}>
            <div>
                <p>Use my test account credentials to log in:</p>
                <p>Email: dev000test111@gmail.com</p>
                <p>Password: react-redux-100%</p>
            </div>

            <TextFieldWrapper>
                <TextField label='Email' {...formik.getFieldProps('email')}/>
                {formik.errors.email ? <FormError>{formik.errors.email}</FormError> : null}
            </TextFieldWrapper>

            <TextFieldWrapper>
                <TextField label='Password' {...formik.getFieldProps('password')} type='password'/>
                {formik.errors.password ? <FormError>{formik.errors.password}</FormError> : null}
            </TextFieldWrapper>

            <FormControlLabel label='Remember me'
                              control={
                                  <Checkbox {...formik.getFieldProps('rememberMe')}
                                            checked={formik.values.rememberMe}/>
                              }/>

            <Button variant={'contained'} color={'primary'} type='submit'>Login</Button>
        </StyledForm>
    )
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  flex-basis: 400px;
`

const TextFieldWrapper = styled.div`
  position: relative;

  margin-bottom: 35px;
`

const FormError = styled.div`
  position: absolute;
  bottom: -23px;
  color: ${({theme}) => theme.palette.error.main};
`