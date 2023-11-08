import * as React from 'react';
import LoginForm from './LoginForm';
import { Link } from 'react-router-dom';
import { CardStyled, GridContainerStyled, GridItemStyled, TypographyStyled, ContainerStyled } from '../style/AuthenticationStyle'
import Layout from "../layout/Layout";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Login() {

    return (
        <Layout>
            <ToastContainer autoClose={1500} />
            <ContainerStyled>
                <CardStyled >
                    <GridContainerStyled container>
                        <GridItemStyled item>
                            <TypographyStyled gutterBottom variant="h3">Đăng nhập</TypographyStyled>
                            <Link style={{ textDecoration: 'none' }} to='/register' >Bạn chưa có tài khoản? Đăng ký</Link>
                        </GridItemStyled>
                        <GridItemStyled item>
                            <LoginForm />
                        </GridItemStyled>
                    </GridContainerStyled>
                </CardStyled>
            </ContainerStyled>
        </Layout>
    );
}