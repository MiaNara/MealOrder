import React from 'react'
import { TableCell, TableRow, Button, Box, Collapse, IconButton, Tooltip, FormHelperText, TextField } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { FoodSchema } from '../Schema';
import { useState } from 'react';
import { Formik, Form, } from 'formik';
import Grid2 from '@mui/material/Unstable_Grid2';
import { StackStyled, TableCellStyled, TableRowStyled } from '../style/TableStyle';
import { modifyPrice, formatCurrency, removeCurrencyDots } from '../utils/Price';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { shortenString } from '../utils/Name';
export default function Bill({ bill, submitDelete, count }) {

    useEffect(() => {
        let newBill = Object.assign({}, bill);
        setData(newBill);
    }, [bill])

    const initData = {
        id: bill.id,
        idEmployee: bill.idEmployee,
        idCategory: bill.idCategory,
        foodName: bill.foodName,
        total: bill.total,
        price: bill.price,
        note: bill.note
    }
    const [data, setData] = useState(initData);
    const [open, setOpen] = React.useState(false);
    const [total, setTotal] = useState(data.total);
    const [price, setPrice] = useState(data.price);
    const [note, setNote] = useState(data.note);
    const [formatPrice, setFormatPrice] = useState(formatCurrency(data.price));
    useEffect(() => {
        setFormatPrice(formatCurrency(price));
    }, [price])

    const DOMAIN = process.env.REACT_APP_DOMAIN;
    const submitEdit = (values) => {
        const newBill = {
            total: total,
            price: price,
            note: note
        }
        axios.post(`${DOMAIN}/api/bill/update/${bill.id}`, newBill,
            {
                withCredentials: false
            })
            .then(res => {
                setData({ ...data, total: total, price: price, note: note });
                toast.success('Cập nhật thành công');
            })
            .catch(err => {
                console.log(err);
                toast.success('Cập nhật thất bại');
            })
    };


    const handleDelete = () => {
        submitDelete([data.id]);
    }
    const handleClose = () => {
        setOpen(false);
        setPrice(data.price);
    }

    const handleOnBlurTotal = (e, handleBlur) => {
        handleBlur(e);

    };
    const handleOnChangeNote = (e, handleChange) => {
        handleChange(e);
        setNote(e.target.value);
    };
    const handleOnChangeTotal = (e, handleChange) => {
        let temp = e.target.value;
        temp = temp === '' ? 0 : temp;
        let total = parseInt(temp)
        if (total >= 0) {
            setTotal(total);
            let newEvent = { ...e }
            newEvent.target.value = total;
            handleChange(newEvent);
        }
    };
    const handleOnBlurPrice = (e, handleBlur) => {
        const temp = removeCurrencyDots(e.target.value);
        const priceAfterModify = modifyPrice(temp)
        setPrice(priceAfterModify)
        const newEvent = { ...e }
        newEvent.target.value = priceAfterModify;
        handleBlur(newEvent)
    };
    const handleOnChangePrice = (e, handleChange) => {
        let temp = removeCurrencyDots(e.target.value);
        let price = parseInt(temp === '' ? 0 : temp)
        if (price >= 0) {
            setPrice(price);
            let newEvent = { ...e }
            newEvent.target.value = price;
            handleChange(newEvent);
        }
    };

    return (
        <>
            <TableRowStyled sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCellStyled component="th" scope="row" align='center'>{count}</TableCellStyled>
                <TableCellStyled align="left" width={'30%'} sx={{ fontSize: '0.9rem', fontWeight: '500', lineHeight: '1.57' }}>{shortenString(data.foodName, 30)}</TableCellStyled>
                <TableCellStyled align="center" >{data.total}</TableCellStyled>
                <TableCellStyled align="left">{formatCurrency(data.price)}</TableCellStyled>
                <TableCellStyled align="left">{formatCurrency(data.price * data.total)}</TableCellStyled>
                <TableCellStyled align="left">{shortenString(data.note, 15)}</TableCellStyled>

                <TableCellStyled>
                    <Tooltip title="Chỉnh sửa">
                        <IconButton onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon /> : <EditIcon />}
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <IconButton onClick={() => handleDelete()}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>

                </TableCellStyled>
            </TableRowStyled>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7} sx={{ backgroundColor: '#fafafa' }}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>

                            <Grid2 container >
                                <Grid2 xs={1}>

                                </Grid2>
                                <Grid2 xs={11}>
                                    <Formik validateOnChange={true}
                                        validateOnBlur={true}
                                        enableReinitialize={true}
                                        initialValues={data}
                                        validationSchema={FoodSchema}
                                        onSubmit={(values, { setSubmitting }) => {
                                            submitEdit(values);
                                            setSubmitting(false);
                                            setOpen(false);
                                        }}
                                    >
                                        {({ isValid, isSubmitting, handleChange, handleBlur, errors, touched }) => (


                                            <Form>
                                                {/* <Stack direction={"row"}> */}
                                                <Grid2 container spacing={1}>
                                                    <Grid2 container xs={12} md={7} sx={{ display: 'flex', float: 'right' }} spacing={1}>
                                                        <Grid2 xs={6}  >
                                                            <StackStyled >
                                                                <TextField
                                                                    width="100%"
                                                                    type='number'
                                                                    label="Số lượng"
                                                                    id="outlined-size-normal"
                                                                    color="success" name="total"
                                                                    onBlur={(e) => handleOnBlurTotal(e, handleBlur)}
                                                                    onChange={(e) => handleOnChangeTotal(e, handleChange)}
                                                                    inputProps={{ maxLength: 5 }}
                                                                    value={total}
                                                                />
                                                                {(
                                                                    <Grid2 item xs={12}>
                                                                        <FormHelperText error>{errors.total && errors.total}</FormHelperText>
                                                                    </Grid2>
                                                                )}

                                                            </StackStyled>
                                                        </Grid2>
                                                        <Grid2 xs={6} >
                                                            <StackStyled >
                                                                <TextField
                                                                    label="Đơn giá"
                                                                    id="outlined-size-normal"
                                                                    color="success" name="price"
                                                                    onBlur={(e) => handleOnBlurPrice(e, handleBlur)}
                                                                    onChange={(e) => handleOnChangePrice(e, handleChange)}
                                                                    inputProps={{ maxLength: 9 }}
                                                                    value={formatPrice}
                                                                />
                                                                {(
                                                                    <Grid2 item xs={12}>
                                                                        <FormHelperText error>{errors.price && errors.price}</FormHelperText>
                                                                    </Grid2>
                                                                )}

                                                            </StackStyled>
                                                        </Grid2>
                                                        <Grid2 xs={12} >
                                                            <StackStyled sx={{ paddingTop: '0' }}>
                                                                <TextField
                                                                    label="Ghi chú"
                                                                    id="outlined-size-normal"
                                                                    multiline
                                                                    color="success" name="note"
                                                                    onBlur={handleBlur}
                                                                    onChange={(e) => handleOnChangeNote(e, handleChange)}
                                                                    defaultValue={data.note}
                                                                    inputProps={{ maxLength: 150 }}
                                                                />
                                                                {(
                                                                    <Grid2 item xs={12}>
                                                                        <FormHelperText error>{errors.note && errors.note}</FormHelperText>
                                                                    </Grid2>
                                                                )}
                                                            </StackStyled>
                                                        </Grid2>
                                                    </Grid2>
                                                    <Grid2 container xs={12} md={3} sx={{ display: 'flex' }} spacing={1}>
                                                        <Grid2 xs={6} md={12}>
                                                            <StackStyled>
                                                                <TextField
                                                                    sx={{ color: 'red', backgroundColor: '#eeeeee' }}
                                                                    color="warning"
                                                                    label="Giá tiền"
                                                                    id="outlined-size-normal"
                                                                    name="price"
                                                                    value={Number.isNaN(price * total) ? 0 : formatCurrency(price * total)}
                                                                    InputProps={{
                                                                        readOnly: true,
                                                                    }}
                                                                />
                                                            </StackStyled>

                                                        </Grid2>
                                                        <Grid2 xs={6} md={12}>
                                                            <div>
                                                                <StackStyled direction={'row'} spacing={2} alignItems={'end'} justifyContent={'end'} paddingTop={'0px'}>
                                                                    <Button ariant="contained" onClick={handleClose}>
                                                                        Hủy
                                                                    </Button>
                                                                    <Button variant="contained" type="submit" disabled={!isValid || isSubmitting}>Cập nhật</Button>
                                                                </StackStyled>
                                                            </div>
                                                        </Grid2>
                                                    </Grid2>
                                                    {/* </Stack> */}
                                                </Grid2>
                                            </Form>

                                        )}
                                    </Formik>

                                </Grid2>
                            </Grid2>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </ >

    )
}
