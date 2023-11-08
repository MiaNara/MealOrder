import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, FormHelperText } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { Formik, Form } from 'formik';
import { CategorySchema } from '../Schema';
import axios from 'axios';
import { OutlinedInputStyled, InputLabelStyled, CardStyled } from '../style/AuthenticationStyle'
import { modifyPrice } from '../utils/Price';
import { UserAuth } from "../context/UserContext";

export default function AddCategoryModal({ foodAdded, listCateData }) {
  const { DOMAIN } = UserAuth()
  const [open, setOpen] = React.useState(false);
  const [price, setPrice] = useState(0);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [avaibleFood, setAvaibleFood] = useState(false);

  const initialValues = {
    foodName: '',
    price: '',
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addFood = (values) => {
    const newFood = {
      foodName: values.foodName.trim(),
      price: price,
    }
    axios.post(`${DOMAIN}/api/category/create`, newFood,
      { withCredentials: false }
    )
      .then(response => {
        foodAdded(true)
        handleClose()
      })
  }
  const handleOnChangeFoodName = (e, handleChange) => {
    handleChange(e)
    if (avaibleFood) {
      setAvaibleFood(false)
    }
  }

  const handleOnBlurPrice = (e, handleBlur) => {
    const priceAfterModify = modifyPrice(e.target.value)
    setPrice(priceAfterModify)
    const newEvent = { ...e }
    newEvent.target.value = priceAfterModify;
    handleBlur(newEvent)
  }
  const handleOnBlurFoodName = (e, handleBlur) => {
    handleBlur(e)
    const result = isAvaibleFood(e.target.value)
    if (result) {
      setAvaibleFood(true)
    }
  }


  const isAvaibleFood = (values) => {
    const foodName = values.trim();
    const result = listCateData.findIndex(cate => cate.foodName === foodName)
    if (result >= 0)
      return true
    return false

  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} sx={{ margin: '20px 0' }}>
        Thêm món ăn
      </Button>

      <Formik validateOnChange={true}
        validateOnInput={true}
        validateOnBlur={true}
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={CategorySchema}
        onSubmit={(values, { setSubmitting }) => {
          addFood(values);
          setSubmitting(false);

        }}

      >
        {({ isValid, handleChange, handleBlur, isSubmitting, errors, touched }) => (

          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >

            <DialogTitle id="responsive-dialog-title">
              {"Thêm Món Ăn"}
            </DialogTitle>
            <Form >
              <CardStyled>
                <DialogContent>
                  <Grid2 container spacing={3}>
                    <Grid2 xs={12}>
                      <Stack>
                        <InputLabelStyled htmlFor="foodName">Tên món</InputLabelStyled>
                        <OutlinedInputStyled
                          id="foodName"
                          color="success" name="foodName"
                          placeholder='Cơm sườn'
                          error={Boolean(touched.foodName && errors.foodName)}
                          onBlur={(e) => handleOnBlurFoodName(e, handleBlur)}
                          onChange={(e) => handleOnChangeFoodName(e, handleChange)}
                        />
                        {touched.foodName && errors.foodName && (
                          <FormHelperText error id="helper-text-foodName-signup">
                            {errors.foodName}
                          </FormHelperText>
                        )}
                        {avaibleFood == true && (
                          <FormHelperText error id="helper-text-price-signup">
                            Món ăn đã tồn tại trong thực đơn
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid2>
                    <Grid2 xs={12}>
                      <Stack>
                        <InputLabelStyled htmlFor="price">Đơn giá</InputLabelStyled>
                        <OutlinedInputStyled
                          color="success" name="price"
                          placeholder='25000'
                          onBlur={(e) => handleOnBlurPrice(e, handleBlur)}
                          onChange={handleChange}
                          error={Boolean(touched.price && errors.price)}

                        />
                        {touched.price && errors.price && (
                          <FormHelperText error id="helper-text-price-signup">
                            {errors.price}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid2>
                  </Grid2>

                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button
                    disableElevation
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                    autoFocus disabled={!isValid || isSubmitting || avaibleFood == true} >
                    Add
                  </Button>
                </DialogActions>
              </CardStyled>
            </Form>

          </Dialog>
        )}
      </Formik>

    </div>
  );
}