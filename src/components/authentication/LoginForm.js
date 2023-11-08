import React from 'react'
import { Formik, Form } from 'formik';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Stack, IconButton, InputAdornment, FormHelperText } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { InputLabelStyled, OutlinedInputStyled, ButtonStyled } from '../style/AuthenticationStyle'
import { useNavigate } from "react-router-dom";
import { LoginSchema } from '../Schema';
import { login } from '../context/AuthService'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function LoginForm() {

    const initialValues = {
        account: '',
        password: ''
    }
    const [showPassword, setShowPassword] = React.useState(false);

    const navigate = useNavigate();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleSubmitLogin = async (values) => {
        try {
            await login(values)
            navigate('../')


        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <ToastContainer autoClose={1500} />

            <Formik validateOnChange={true}
                validateOnBlur={true}
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={LoginSchema}
                onSubmit={(values, { setSubmitting }) => {
                    handleSubmitLogin(values);
                    setSubmitting(false);
                }}

            >
                {({ isValid, isSubmitting, handleChange, handleBlur, errors, touched }) => (
                    <Form >
                        <Grid2 container spacing={3} >
                            <Grid2 xs={12}>
                                <Stack spacing={1}  >

                                    <InputLabelStyled htmlFor="account-login">Tài khoản</InputLabelStyled>
                                    <OutlinedInputStyled
                                        id="account-login"
                                        type="text"
                                        name="account"
                                        placeholder="Nhập tên tài khoản"
                                        fullWidth
                                        error={Boolean(touched.account && errors.account)}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    />
                                    {touched.account && errors.account && (
                                        <FormHelperText error id="standard-weight-helper-text-account-login">
                                            {errors.account}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid2>
                            <Grid2 xs={12}>
                                <Stack spacing={1}>

                                    <InputLabelStyled htmlFor="password-login">Mật khẩu</InputLabelStyled>
                                    <OutlinedInputStyled
                                        fullWidth
                                        error={Boolean(touched.password && errors.password)}
                                        id="password-login"
                                        name='password'
                                        type={showPassword ? 'text' : 'password'}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
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
                                        placeholder="Nhập mật khẩu"
                                    />
                                    {touched.password && errors.password && (
                                        <FormHelperText error id="standard-weight-helper-text-password-login">
                                            {errors.password}
                                        </FormHelperText>
                                    )}

                                </Stack>
                            </Grid2>
                            {errors.submit && (
                                <Grid2 item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid2>
                            )}
                            <Grid2 xs={12} >
                                <ButtonStyled
                                    disableElevation
                                    disabled={!isValid || isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Đăng nhập
                                </ButtonStyled>
                            </Grid2>
                        </Grid2>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
