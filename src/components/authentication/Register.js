import * as React from 'react';
import RegisterForm from './RegisterForm';
import { Link } from 'react-router-dom';
import { CardStyled, GridContainerStyled, GridItemStyled, TypographyStyled, ContainerStyled } from '../style/AuthenticationStyle'
import Layout from "../layout/Layout";

export default function Register() {
    return (
        <Layout>
            <ContainerStyled>
                <CardStyled >
                    <GridContainerStyled container>
                        <GridItemStyled item>
                            <TypographyStyled gutterBottom variant="h3">Đăng ký</TypographyStyled>
                            <Link style={{ textDecoration: 'none' }} to='/login'>Bạn đã có tài khoản? Đăng nhập</Link>
                        </GridItemStyled>
                        <GridItemStyled item>
                            <RegisterForm />
                        </GridItemStyled>
                    </GridContainerStyled>
                </CardStyled>
            </ContainerStyled>
        </Layout>
    );
}