import React, { memo } from 'react'
import { Stack, FormHelperText, Tooltip, IconButton } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { OutlinedInputStyled } from '../style/AuthenticationStyle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';
import { removeCurrencyDots, formatCurrency, modifyPrice } from '../utils/Price'
function CollectionFields({ item, index, handleChange, handleBlur, handleSetItems, handleDelete, errors, touched, sameFoodName, setSameFoodName, availableFood, setAvailableFood }) {
    const [foodData, setFoodData] = useState({ ...item })
    const [formatPrice, setFormatPrice] = useState(formatCurrency(foodData.price))

    useEffect(() => {
        setFormatPrice(formatCurrency(foodData.price))
    }, [foodData.price])
    const handleOnChangeFoodName = (e) => {
        setFoodData({ ...foodData, foodName: e.target.value })

        if (Number.isInteger(sameFoodName)) {
            console.log('buon qua aaa');
            setSameFoodName()
        }
        if (Number.isInteger(availableFood)) {
            setAvailableFood()
        }
        handleChange(e)

    }
    const handleOnBlurFoodName = (e) => {
        const newValues = { ...item, foodName: e.target.value }
        handleSetItems(newValues, index)
        handleBlur(e)
    }
    const handleOnBlurPrice = (e) => {
        let temp = removeCurrencyDots(e.target.value);
        let price = modifyPrice(temp)
        const newValues = { ...item, price: price }
        handleSetItems(newValues, index)
        handleBlur(e)
    }
    const handleOnChangeFoodPrice = (event) => {
        let temp = removeCurrencyDots(event.target.value);
        let price = parseInt(temp === '' ? 0 : temp)
        if (price >= 0) {
            if (price > 9999999) {
                price = 200000
            }
            setFoodData({ ...foodData, price: price })
            let newEvent = { ...event }
            newEvent.target.value = price
            handleChange(newEvent)

        }
    }
    useEffect(() => {
        setFoodData({ ...item })
    }, [item])

    return (
        <Grid2 container spacing={1} key={index}>
            <Grid2 xs={7}>
                <Stack>
                    <OutlinedInputStyled
                        id={`foodItems[${index}].foodName`}
                        value={foodData.foodName}
                        onBlur={(e) => handleOnBlurFoodName(e)}
                        color="success" name={`foodItems[${index}].foodName`}
                        error={Boolean(errors.foodItems && errors.foodItems[index] && errors.foodItems[index].foodName)}                                                            // // defaultValue={foodData.foodName}
                        onChange={(e) => handleOnChangeFoodName(e)}
                    />
                    {errors.foodItems && errors.foodItems[index] && (
                        <FormHelperText error>{errors.foodItems[index].foodName}</FormHelperText>
                    )}
                    {Number.isInteger(availableFood) && availableFood === index && (
                        <FormHelperText error id="helper-text-foodName">
                            Món ăn đã bị trùng trong thực đơn hôm nay
                        </FormHelperText>
                    )}
                    {Number.isInteger(sameFoodName) && sameFoodName === index && (
                        <FormHelperText error id="helper-text-price-signup">
                            Món ăn đã bị trùng tên
                        </FormHelperText>
                    )}

                </Stack>
            </Grid2>
            <Grid2 xs={4}>
                <Stack>
                    <OutlinedInputStyled
                        id={`foodItems[${index}].price`}
                        color="success" name={`foodItems[${index}].price`}
                        value={formatPrice}
                        onBlur={(e) => handleOnBlurPrice(e)}
                        onChange={(e) => handleOnChangeFoodPrice(e)}
                        // inputProps={{ step: "5000", }}
                        // itemType='number'
                        // type="number"
                        error={Boolean(errors.foodItems && errors.foodItems[index] && touched.foodItems && touched.foodItems[index] && errors.foodItems[index].price)}                                                            // // defaultValue={foodData.foodName}

                    />
                    {errors.foodItems && errors.foodItems[index] && (
                        <FormHelperText error>{errors.foodItems[index].price}</FormHelperText>
                    )}
                </Stack>
            </Grid2>
            <Grid2 xs={1}>
                <Tooltip title="Xóa">
                    <IconButton
                        onClick={() => handleDelete(item, index)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Grid2>
        </Grid2>
    )
}

export default memo(CollectionFields)