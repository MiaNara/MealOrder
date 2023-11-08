import React from 'react'
import { RegisterSchema } from '../Schema';
import { useState } from 'react';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { InputLabelStyled, OutlinedInputStyled, ButtonStyled } from '../style/AuthenticationStyle'


// material-ui
import {
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    Stack,
} from '@mui/material';

// third party
import { useNavigate } from "react-router-dom";

import { Formik, Form } from 'formik';
import { register } from '../context/AuthService'

export default function RegisterForm() {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isNotSamePassword, setIsNotSamePassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const [showRePassword, setShowRePassword] = useState(false);
    const handleClickShowRePassword = () => {
        setShowRePassword(!showRePassword);
    };
    const handleBlurRePassword = (event, handleBlur) => {
        const RePassword = event.target.value;
        if (RePassword !== password) {
            setIsNotSamePassword(true);
        }
        handleBlur(event);
    }
    const handleChangeRePassword = (event, handleChange) => {
        if (isNotSamePassword) {
            setIsNotSamePassword(false);
        }
        handleChange(event);
    }
    const handleChangePassword = (event, handleChange) => {
        setPassword(event.target.value);
        handleChange(event);
    }


    const handleSubmitRegister = async (values) => {
        try {
            await register(values)
            navigate('../login')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Formik
                initialValues={{
                    fullName: '',
                    account: '',
                    password: '',
                    rePassword: '',
                    department: '',
                    phone: ''
                }}
                validationSchema={RegisterSchema}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        handleSubmitRegister(values);
                        setStatus({ success: false });
                        setSubmitting(false);
                    } catch (err) {
                        console.error(err);
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, isValid }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12}>
                                <Stack spacing={1}>
                                    <InputLabelStyled htmlFor="fullName">Họ và tên</InputLabelStyled>
                                    <OutlinedInputStyled
                                        id="fullName"
                                        type="text"
                                        value={values.fullName}
                                        name="fullName"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="John Smith"
                                        fullWidth
                                        error={Boolean(touched.fullName && errors.fullName)}
                                    />
                                    {touched.fullName && errors.fullName && (
                                        <FormHelperText error id="helper-text-fullName-signup">
                                            {errors.fullName}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={7}>
                                <Stack spacing={1}>
                                    <InputLabelStyled htmlFor="account-signup">Tên tài khoản</InputLabelStyled>
                                    <OutlinedInputStyled
                                        fullWidth
                                        error={Boolean(touched.account && errors.account)}
                                        id="account-signup"
                                        type="text"
                                        value={values.account}
                                        name="account"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="johnsmith"
                                    // sx={{ textTransform: 'lowercase', fontVariant:  }}
                                    // InputProps={{ textTransform: 'lowercase', fontVariant: 'small-cap' }}
                                    />
                                    {touched.account && errors.account && (
                                        <FormHelperText error id="helper-text-account-signup">
                                            {errors.account}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <Stack spacing={1} >
                                    <InputLabelStyled htmlFor="department-signup">Đơn vị</InputLabelStyled>
                                    <OutlinedInputStyled
                                        fullWidth
                                        error={Boolean(touched.department && errors.department)}
                                        id="department-signup"
                                        type='text'
                                        value={values.department}
                                        name="department"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="IT"
                                        inputProps={{}}
                                    />
                                    {touched.department && errors.department && (
                                        <FormHelperText error id="helper-text-department-signup">
                                            {errors.department}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabelStyled htmlFor="phone-signup">Số điện thoại</InputLabelStyled>
                                    <OutlinedInputStyled
                                        fullWidth
                                        error={Boolean(touched.phone && errors.phone)}
                                        id="phone-login"
                                        type='text'
                                        value={values.phone}
                                        name="phone"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="0985896***"
                                        inputProps={{}}
                                    />
                                    {touched.phone && errors.phone && (
                                        <FormHelperText error id="helper-text-phone-signup">
                                            {errors.phone}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabelStyled htmlFor="password-signup">Mật khẩu</InputLabelStyled>
                                    <OutlinedInputStyled
                                        fullWidth
                                        error={Boolean(touched.password && errors.password)}
                                        id="password-signup"
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={(e) => handleChangePassword(e, handleChange)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        placeholder="******"
                                        inputProps={{}}
                                    />
                                    {touched.password && errors.password && (
                                        <FormHelperText error id="helper-text-password-signup">
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabelStyled htmlFor="password-signup">Nhập lại mật khẩu</InputLabelStyled>
                                    <OutlinedInputStyled
                                        fullWidth
                                        error={Boolean(touched.rePassword && errors.rePassword)}
                                        id="RePassword-signup"
                                        type={showRePassword ? 'text' : 'password'}
                                        value={values.rePassword}
                                        name="rePassword"
                                        onBlur={(e) => handleBlurRePassword(e, handleBlur)}
                                        onChange={(e) => handleChangeRePassword(e, handleChange)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowRePassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    size="large"
                                                >
                                                    {showRePassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        placeholder="******"
                                        inputProps={{}}
                                    />
                                    {touched.rePassword && errors.rePassword && (
                                        <FormHelperText error id="helper-text-password-signup">
                                            {errors.rePassword}
                                        </FormHelperText>
                                    )}
                                    {isNotSamePassword && (
                                        <FormHelperText error id="helper-text-password-signup">
                                            Mật khẩu không khớp
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}
                            <Grid item xs={12}>

                                <ButtonStyled
                                    disableElevation
                                    disabled={isSubmitting || !isValid || isNotSamePassword}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Tạo tài khoản
                                </ButtonStyled>

                            </Grid>

                        </Grid>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
