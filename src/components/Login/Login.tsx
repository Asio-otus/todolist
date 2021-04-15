import React from "react";
import {Button, Checkbox, FormControlLabel, TextField} from "@material-ui/core";
import {FormikHelpers, useFormik} from "formik";
import {login} from "../../bll/reducers/auth-reducer";
import styled from "styled-components";
import {AppDispatchT, useAppDispatch} from "../../bll/store";

type PropsType = {}

type FormikValueT = {
    email: string
    password: string
    rememberMe: boolean
}

type FormikErrorT = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login: React.FC<PropsType> = () => {

    const dispatch = useAppDispatch()

    const formik = useFormik({

        validate: (values) => {
            const errors: FormikErrorT = {}
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
        onSubmit: async (values, formikHelpers: FormikHelpers<FormikValueT>) => {
            const action = await dispatch(login(values))

            if (login.rejected.match(action)) {
                if (action.payload?.fieldsErrors?.length) {
                    const error = action.payload?.fieldsErrors[0]
                    formikHelpers.setFieldError(error.field, error.error)
                }
            }
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