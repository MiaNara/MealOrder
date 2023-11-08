import * as React from 'react';
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper, Container } from '@mui/material';
import AddFood from './AddFood';
import Bill from './Bill';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { TableHeaderStyled } from '../style/TableStyle';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { UserAuth } from "../context/UserContext";
import Layout from '../layout/Layout';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmDialog from '../ConfirmDialog';
export default function Bills() {
    const DOMAIN = process.env.REACT_APP_DOMAIN;
    const { getUserData } = UserAuth();
    const [BillData, setBillData] = useState([]);
    const userData = getUserData()
    useEffect(() => {
        axios.get(`${DOMAIN}/api/bill/getById/${userData.id}`, {
            withCredentials: false
        })
            .then(res => {
                return res.data.data
            })
            .then((data) => {
                setBillData(data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);
    const fetchData = () => {
        axios.get(`${DOMAIN}/api/bill/getById/${userData.id}`, {
            withCredentials: false
        })
            .then(res => {
                return res.data.data
            })
            .then((data) => {
                setBillData(data);
            })
            .catch(err => {
                console.log(err);
            })
    }


    const childDelete = (deleted) => {
        if (deleted) {
            fetchData();
        }
    }
    const foodAdded = (added) => {
        if (added === true) {
            fetchData();
        }
    }
    const deleteAll = () => {
        submitDelete(BillData.map((bill) => { return bill.id }));
    }

    const submitDelete = (idList) => {
        const deleteBill = {
            "idBillManagement": idList
        }
        axios.delete(`${DOMAIN}/api/bill/delete`, { data: deleteBill }, { withCredentials: false })
            .then(res => {
                fetchData();
                toast.success('Xóa thành công');
            })
            .catch(err => {
                console.log(err);
                toast.error('Xóa thất bại');
            })
    }
    let count = 1;

    return (
        <Layout>
            <Container sx={{ minHeight: '75vh', marginTop: '5rem' }}>
                <Grid2 container>
                    <Grid2 xs={12}>
                        <AddFood foodAdded={foodAdded} BillData={BillData} />
                    </Grid2>
                    <Grid2 xs={12}>
                        <TableContainer component={Paper}>
                            <Table aria-label="collapsible table">
                                <TableHead>
                                    <TableRow>
                                        <TableHeaderStyled align="center">STT</TableHeaderStyled>
                                        <TableHeaderStyled align="left">Tên món</TableHeaderStyled>
                                        <TableHeaderStyled align="center">Số lượng</TableHeaderStyled>
                                        <TableHeaderStyled align="left">Đơn giá</TableHeaderStyled>
                                        <TableHeaderStyled align="left">Giá tiền</TableHeaderStyled>
                                        <TableHeaderStyled align="left">Ghi chú</TableHeaderStyled>
                                        <TableHeaderStyled>
                                            <>&nbsp;&emsp;&emsp;&emsp;</>
                                            <ConfirmDialog name="hóa đơn" deleteAll={deleteAll} />
                                        </TableHeaderStyled>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {BillData && BillData.map((bill) => (
                                        <Bill key={bill.id} bill={bill} count={count++} submitDelete={submitDelete} childDelete={childDelete} />
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid2>
                </Grid2>
            </Container>
        </Layout>
    );
} 