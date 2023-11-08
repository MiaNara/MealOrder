import { Container } from '@mui/system'
import React, { useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import axios from 'axios'
import { UserAuth } from "../context/UserContext";
import { toast } from 'react-toastify';
import { formatCurrency, removeCurrencyDots } from '../utils/Price';
import 'react-toastify/dist/ReactToastify.css';

export default function AddFood2({ handleClose, foodAdded, BillData }) {
    const { getUserData } = UserAuth();
    const DOMAIN = process.env.REACT_APP_DOMAIN;
    const userData = getUserData()

    const [listFoodName, setListFoodName] = React.useState([]);
    const [value, setValue] = React.useState(null);
    const [inputItemName, setInputItemName] = React.useState('');

    const [currentPrice, setCurrentPrice] = React.useState(0);
    const [priceDefault, setPriceDefault] = React.useState(0);
    const [currentId, setCurrentId] = React.useState(0);
    const [formatPrice, setFormatPrice] = React.useState('');
    const [category, setCategory] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    const [note, setNote] = React.useState('');

    useEffect(() => getAll(), [])
    const MIN = priceDefault;
    const MAX = 200000;
    const MAX_TOTAL = 100;
    const getAll = () => {
        axios.get(`${DOMAIN}/api/category/getall`)
            .then(response => {
                let result = response.data.listdata;
                setCategory(result);
            })
            .catch(error => console.log("Get all error", error));
    }

    function order(e) {
        e.preventDefault();
        let tempTotal = total;
        let tempCurrentPrice = currentPrice;
        let tempNote = note;
        setTotal('');
        setNote('');
        setCurrentPrice('');
        if (tempCurrentPrice % 1000 === 0) {
            const data = {
                "idCategory": currentId,
                "total": tempTotal,
                "price": tempCurrentPrice,
                "note": tempNote
            }
            axios.post(`${DOMAIN}/api/bill/create/${userData.id}`, data)
                .then(res => {
                    foodAdded(true);
                    toast.success('Đặt món thành công');
                    handleClose();
                })
                .catch(err => {
                    toast.error('Đặt món không thành công');
                })
        } else {
            toast.error('Đặt món không thành công');
        }
    }


    useEffect(() => {
        setListFoodName(() => {
            const foodName = category.map((cate) => {
                return { price: cate.price, label: cate.foodName, id: cate.id }
            });
            setTotal(1);
            return foodName;
        })
    }, [category]);

    const checkPrice = () => {
        if (currentPrice < MIN) {
            setCurrentPrice(parseInt(MIN))
        }
        else if (currentPrice > MAX) {
            setCurrentPrice(parseInt(MAX))
        }
        else {
            let temp = currentPrice / 1000
            let temp2 = parseInt(temp) * 1000
            setCurrentPrice(parseInt(temp2))
        }
    }
    const checkTotal = (event) => {
        const { value } = event.target;
        if (value < 1) {
            setTotal(1)
        }
        else if (value > MAX_TOTAL) {
            setTotal(MAX_TOTAL)
        }
        else {
            setTotal(parseInt(value === '' ? 1 : value))
        }
    }
    const handleOnChangePrice = (event) => {
        const temp = removeCurrencyDots(event.target.value);
        let price = parseInt(temp === '' ? 0 : temp)
        if (price >= 0) {
            if (price > 9999999) {
                setCurrentPrice(MAX)
            }
            else setCurrentPrice(price)
        }
    }
    useEffect(() => {
        setFormatPrice(formatCurrency(currentPrice))
    }, [currentPrice])

    return (

        <form onSubmit={(e) => order(e)}>
            <Container sx={{ display: "flex", justifyContent: 'center', alignItems: 'center' }}>
                {/* <Card variant="outlined" sx={{ maxWidth: 453 }}> */}
                <Box sx={{ minWidth: 275 }}>
                    <div>
                        <Grid container sx={{ padding: '0px 10px 10px 0px', display: "flex", justifyContent: 'center', alignItems: 'center' }}>
                            <Grid item xs={12} style={{ padding: '10px 0px 0px 10px' }}>
                                <Autocomplete
                                    value={value}
                                    onChange={(event, newValue, reason) => {
                                        setValue(newValue);
                                        if (reason === 'clear') {
                                            setCurrentPrice(0)
                                            setCurrentId(0)
                                        } else {
                                            setCurrentPrice(newValue.price)
                                            setPriceDefault(newValue.price)
                                            setCurrentId(newValue.id)
                                        }

                                    }}
                                    inputValue={inputItemName}
                                    onInputChange={(event, newInputValue, reason) => {
                                        setInputItemName(newInputValue)
                                        if (!newInputValue) {
                                            setCurrentPrice(0)
                                            setCurrentId(0)
                                        }

                                    }}

                                    id="input_foodname"
                                    options={listFoodName}
                                    renderInput={(params) => <TextField
                                        {...params}
                                        sx={{ fontFamily: '"Public Sans", sans-serif' }}
                                        variant="outlined"
                                        label="Danh sách món ăn"
                                        placeholder="Hãy chọn món"
                                    />}
                                />

                            </Grid>
                            <Grid container spacing={1} style={{ padding: '30px 0px 10px 10px', display: "flex", alignItems: 'center' }}>
                                <Grid item xs={3} md={2.5}>
                                    <label for='input-price' >Đơn giá</label>
                                </Grid>
                                <Grid item xs={8} md={9}>
                                    <TextField sx={{ width: '100%' }}
                                        id="input-price"
                                        type="text"
                                        value={formatPrice}
                                        disabled={currentId === 0}
                                        onChange={(event) => {
                                            handleOnChangePrice(event)
                                        }}
                                        onBlur={checkPrice}
                                        InputProps={{
                                            inputProps: { step: 5000, max: MAX }
                                        }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }
                                        }
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={1} style={{ padding: '20px 0px 10px 10px', display: "flex", alignItems: 'center' }}>
                                <Grid item xs={3} md={2.5}>
                                    <label for='input-total' > Số lượng</label>
                                </Grid>
                                <Grid item xs={8} md={9}>
                                    <TextField sx={{ width: '100%' }}
                                        id="input-total"
                                        // type="Number"
                                        disabled={currentId === 0}
                                        value={total}
                                        onChange={(event) => {
                                            checkTotal(event)
                                        }}
                                        InputProps={{ inputProps: { min: 1 } }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={1} style={{ padding: '20px 0px 10px 10px', display: "flex", alignItems: 'center' }}>
                                <Grid item xs={3} md={2.5}>
                                    <label for='input-note' >Ghi chú</label>
                                </Grid>
                                <Grid item xs={8} md={9}>
                                    <TextField sx={{ width: '100%' }}
                                        id="input-note"
                                        type="text"
                                        multiline
                                        disabled={currentId === 0}
                                        value={note}
                                        onChange={(event) => {
                                            const { value } = event.target;
                                            setNote(value)
                                        }}
                                        InputProps={{ inputProps: { min: 1 } }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container columnSpacing={2} style={{ padding: '20px 0px 10px 10px', display: "flex", alignItems: 'center' }}>
                                <Grid item xs={3} md={2.5} >
                                    <label >Tổng tiền</label>
                                </Grid>
                                <Grid item xs={8} md={9} sx={{ float: 'left', display: 'flex' }}  >
                                    <span style={{ fontSize: '18px', fontWeight: '600' }}>
                                        {`${formatCurrency(currentPrice * (total))} VND`}
                                    </span>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} style={{ padding: '20px 0px 10px 10px' }}>

                                <Button type="submit" variant="contained" disabled={currentId === 0 || currentPrice < MIN || currentPrice > MAX} sx={{ float: 'right', display: 'flex' }} >
                                    Đặt món ăn
                                </Button>
                                <Button onClick={handleClose} sx={{ float: 'right', display: 'flex', marginRight: '15px' }} >
                                    Đóng
                                </Button>

                            </Grid>
                        </Grid>
                    </div>
                </Box>
                {/* </Card> */}
            </Container >
        </form >
    )

}
