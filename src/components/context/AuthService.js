import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// const domain = process.env.DOMAIN;
// import express from 'express'
const DOMAIN = process.env.REACT_APP_DOMAIN;
export const login = async (values) => {
    console.log(DOMAIN)

    await axios.post(`${DOMAIN}/api/login`, values, {
        withCredentials: false,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    })
        .then((res) => {
            console.log(res);
            let user = JSON.stringify(res.data.data);
            if (user && user !== '') {
                localStorage.setItem('user', JSON.stringify(res.data.data));
                toast.success('Welcome ' + res.data.data.account + ' !')
            } else {
                throw new Error('Tên tài khoản hoặc mật khẩu không đúng')
            }
        })
        .catch((err) => {
            console.log(err);
            toast.error(err.message)
        })
}
export const register = async (values) => {
    const newAccount = {
        fullName: values.fullName,
        account: values.account,
        password: values.password,
        department: values.department,
        phone: values.phone,
    }
    console.log(newAccount)

    await axios.post(`${DOMAIN}/api/register/create`, newAccount, {
        withCredentials: false,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    })
        .then((res) => {
            console.log(res.data);
            // localStorage.setItem('user', JSON.stringify(res.data.data));
            toast.success('Đăng kí thành công!')
        })
        .catch((err) => {
            console.log(err)
            toast.error('Đăng ký thất bại')
        })
}
export const logout = () => {
    localStorage.removeItem('user');
}
