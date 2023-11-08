import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Stack, IconButton, FormHelperText, TextField, Tooltip, Button, TableRow, TableCell, } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form } from 'formik';
import { CategorySchema } from '../Schema';
import { modifyPrice, formatCurrency, removeCurrencyDots } from '../utils/Price';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Category({ category, count, childDelete, listCateData }) {
  const DOMAIN = process.env.REACT_APP_DOMAIN;
  const initData = {
    id: category.id,
    foodName: category.foodName,
    price: category.price
  }
  console.log('initData', initData);

  const [cateData, setCateData] = useState(initData);
  const [isEdit, setIsEdit] = useState(false);
  const [avaibleFood, setAvaibleFood] = useState(false);
  const [foodName, setFoodName] = useState(cateData.foodName);
  const [price, setPrice] = useState(cateData.price);
  const [formatPrice, setFormatPrice] = useState(formatCurrency(cateData.price));
  console.log('cateData', cateData);

  const submitEdit = () => {
    let dataUpdate = {
      foodName: foodName.trim(),
      price: price
    }
    axios.post(`${DOMAIN}/api/category/update/${cateData.id}`, dataUpdate)
      .then((response) => {
        console.log('cateData', cateData);
        console.log('dataUpdate', dataUpdate);

        setCateData(response.data.data)
        toast.success('Đã cập thật thành công')
      })
      .catch((err) => {
        toast.error('Cập nhật thất bại')
      })
  }
  const handleClose = () => {
    setIsEdit(false)
    setFormatPrice(formatCurrency(cateData.price))
  }
  const handleDelete = () => {
    const deleteData = {
      "categoryId": [+cateData.id]
    }

    axios.delete(`${DOMAIN}/api/category/delete`, { data: deleteData })
      .then((response) => {
        childDelete(true)
        toast.success('Đã xóa thành công')
      })
      .catch((err) => {
        console.log(err);
        toast.error('Xóa thất bại')

      });
  }


  const isAvaibleFood = (values, listData) => {
    const foodName = values.trim();
    const result = listData.find(cate => cate.foodName === foodName)
    if (result !== undefined && result.id === cateData.id)
      return false
    else if (result !== undefined)
      return true
    else return false

  }

  const handleOnBlurFoodName = (e, handleBlur) => {
    handleBlur(e)
    const result = isAvaibleFood(e.target.value, listCateData)
    if (result) {
      setAvaibleFood(true)
    }
  }
  console.log('price', price);
  console.log('formatPRice', formatPrice);


  const handleOnBlurPrice = (e, handleBlur) => {
    const temp = removeCurrencyDots(e.target.value);
    const priceAfterModify = modifyPrice(temp)
    setPrice(priceAfterModify)
    const newEvent = { ...e }
    newEvent.target.value = priceAfterModify;
    handleBlur(newEvent)
  }
  const handleOnChangeFoodName = (e, handleChange) => {
    handleChange(e)
    if (avaibleFood) {
      setAvaibleFood(false)
    }
    setFoodName(e.target.value)
  }
  const handleOnChangePrice = (e, handleChange) => {
    let temp = removeCurrencyDots(e.target.value)
    let price = parseInt(temp === '' ? 0 : temp)
    if (price >= 0) {
      const newEvent = { ...e }
      newEvent.target.value = price;
      setPrice(price)
      handleChange(newEvent)
    }

  }
  useEffect(() => {
    setFormatPrice(formatCurrency(price));
  }, [price])
  return (
    <>
      {isEdit === false && (
        <TableRow>
          <TableCell align="center">{count}</TableCell>
          <TableCell align="left">{cateData.foodName}</TableCell>
          <TableCell align="left">{formatCurrency(cateData.price)}</TableCell>
          <TableCell align="center"> <Tooltip title="Chỉnh sửa">
            <IconButton onClick={() => setIsEdit(true)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
            <Tooltip title="Xóa">
              <IconButton onClick={() => handleDelete()}>
                <DeleteIcon />
              </IconButton>
            </Tooltip></TableCell>
        </TableRow>
      )}

      {isEdit && (
        <Formik validateOnChange={true}
          validateOnBlur={true}
          enableReinitialize={true}
          initialValues={cateData}
          validationSchema={CategorySchema}
          onSubmit={(values, { setSubmitting }) => {
            submitEdit();
            setSubmitting(false);
            setIsEdit(false);
          }}
        >
          {({ isValid, isSubmitting, handleChange, handleBlur, errors, touched }) => (

            <TableRow>
              <TableCell align="center" sx={{ width: '13%' }}>{count}</TableCell>
              <TableCell align="left" colSpan={3} sx={{ display: 'float', justifyContent: 'space-evenly' }} >
                <Form>
                  <Stack direction={"row"} >
                    <Grid2 container spacing={3} width={'100%'}>
                      <Grid2 xs={11} md={4.5}>
                        <Stack>
                          <TextField
                            sx={{ width: { md: '18rem' } }}
                            label="Tên món ăn"
                            id="outlined-size-small"
                            color="success" name="foodName"
                            inputProps={{ maxLength: 120 }}
                            onBlur={(e) => handleOnBlurFoodName(e, handleBlur)}
                            onChange={(e) => handleOnChangeFoodName(e, handleChange)}
                            defaultValue={cateData.foodName}
                          />
                          {errors.foodName && (
                            <Grid2 xs={12} sx={{ margin: 0, paddingLeft: 0, paddingBottom: 0 }}>
                              <FormHelperText error>{errors.foodName}</FormHelperText>
                            </Grid2>
                          )}
                          {avaibleFood === true && (
                            <FormHelperText error id="helper-text-price-signup">
                              Món ăn đã tồn tại trong thực đơn
                            </FormHelperText>
                          )}
                        </Stack>
                      </Grid2>
                      <Grid2 xs={11} md={4} sx={{ marginLeft: { md: '2vw' } }}>
                        <Stack >
                          <TextField
                            sx={{ width: { md: '15rem' } }}
                            label="Đơn giá"
                            id="outlined-size-small"
                            color="success" name="price"
                            inputProps={{ maxLength: 12 }}
                            onChange={(e) => handleOnChangePrice(e, handleChange)}
                            onBlur={(e) => handleOnBlurPrice(e, handleBlur)}
                            value={formatPrice}
                          />
                          {errors.price && (
                            <Grid2 xs={12} sx={{ margin: 0, paddingLeft: 0, paddingBottom: 0 }}>
                              <FormHelperText error>{errors.price}</FormHelperText>
                            </Grid2>
                          )}
                        </Stack>
                      </Grid2>
                      <Grid2 xs={12} md={3} sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                        <div>
                          <Stack direction={'row'} spacing={1} >
                            <Button ariant="contained" onClick={handleClose}>
                              Bỏ
                            </Button>
                            <Button variant="contained" type="submit" disabled={!isValid || isSubmitting || avaibleFood === true}>Hoàn tất</Button>
                          </Stack>
                        </div>
                      </Grid2>
                    </Grid2>
                  </Stack>
                </Form>
              </TableCell>
            </TableRow>
          )}
        </Formik>

      )}
    </>
  );
}
