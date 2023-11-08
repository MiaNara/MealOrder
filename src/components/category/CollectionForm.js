import * as React from 'react';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Formik, Form } from 'formik';
import { InputLabelStyled, ButtonStyled } from '../style/AuthenticationStyle'
import { CategorySchema2 } from '../Schema';
import { useState } from 'react';
import { Tooltip, IconButton, Card, Box, Typography, CardActions, CardContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import CollectionFields from './CollectionFields';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
function RadioButtons({ choose1, choose2, listData, listData2 }) {
    const DOMAIN = process.env.REACT_APP_DOMAIN;
    const navigate = useNavigate();
    const [allCategoryItems, setAllCategoryItems] = useState({});
    const [optionItems, setOptionItems] = useState({})
    const [newItems, setNewItems] = useState({})
    const [index, setIndex] = useState(1)
    const handleAddNewItem = () => {
        let newCategory = {}
        setIndex(index + 1)
        if (allCategoryItems && allCategoryItems.foodItems) {
            newCategory = {
                foodItems: [...allCategoryItems.foodItems,
                { nID: index, foodName: '', price: '' }]
            }
        } else {
            newCategory = {
                foodItems: [{ nID: index, foodName: '', price: '' }]
            }
        }
        setAllCategoryItems(newCategory);
    }

    React.useEffect(() => {
        if (Number.isInteger(sameFoodName)) {
            setSameFoodName()
        }
        if (Number.isInteger(availableFood)) {
            setAvailableFood()
        }
        if (choose1) {
            const newCategory = {
                foodItems: [...listData.foodItems]
            }
            setOptionItems(newCategory)

        }
        else if (choose2) {
            const newCategory = {
                foodItems: [...listData2.foodItems]
            }
            setOptionItems(newCategory)
        }
        else if ((!choose1 && !choose2)) {
            setOptionItems({})
        }
    }, [choose1, choose2])
    React.useEffect(() => {
        let newCategory = {}
        if (optionItems.foodItems && newItems.foodItems) {
            newCategory = {
                foodItems: [...optionItems.foodItems, ...newItems.foodItems]
            }
        } else
            if (optionItems.foodItems) {
                newCategory = {
                    foodItems: [...optionItems.foodItems]
                }
            } else if (newItems.foodItems) {
                newCategory = {
                    foodItems: [...newItems.foodItems]
                }
            }
        setAllCategoryItems(newCategory);
    }, [optionItems, newItems])

    const handleSetItems = (values, index) => {
        let newCategory = {
            foodItems: [...allCategoryItems.foodItems]
        }
        newCategory.foodItems[index] = values
        setAllCategoryItems(newCategory)

    }
    const handleOnChangeFoodName = (e, handleChange) => {
        handleChange(e)
    }
    const handleDelete = (item, i) => {
        if (item.nID && item.nID >= 0) {
            let removed = allCategoryItems.foodItems.filter((temp) => !temp.nID || (temp.nID && (temp.nID !== item.nID)))
            const newCategory = {
                foodItems: [...removed]
            }
            setAllCategoryItems(newCategory)
        }
        else {
            console.log('khong co nID');
            let removed = allCategoryItems.foodItems.filter((item, index) => index !== i)
            const newCategory = {
                foodItems: [...removed]
            }
            setOptionItems(newCategory)
        }
    }

    // const handleDelete = (item, i) => {
    //     if (item.nID && item.nID >= 0) {
    //         console.log('co nID', newItems.foodItems);

    //         let removed = newItems.foodItems.filter((temp) => temp.nID !== item.nID)

    //         console.log('after removed', removed);

    //         const newCategory = {
    //             foodItems: [...removed]
    //         }
    //         setNewItems(newCategory)
    //     }
    //     else {
    //         console.log('khong co nID');
    //         let removed = optionItems.foodItems.filter((item, index) => index !== i)
    //         const newCategory = {
    //             foodItems: [...removed]
    //         }
    //         setOptionItems(newCategory)
    //     }

    // }
    // const handleDelete = (key) => {
    //     let removed = categoryItems.foodItems.filter((item, index) => index !== key)
    //     const newCategory = {
    //         foodItems: [...removed]
    //     }
    //     setCategoryItems(newCategory)
    // }
    // const handleSetItemsAddFields = (values, index) => {
    //     // setCategoryItems(values)
    //     let newCategory = {
    //         foodItems: [...allCategoryItems.foodItems]
    //     }
    //     newCategory.foodItems[index] = values
    //     setAllCategoryItems(newCategory)

    // }

    // const handleDeleteAddFields = (key) => {
    //     let removed = allCategoryItems.foodItems.filter((item, index) => index !== key)
    //     const newCategory = {
    //         foodItems: [...removed]
    //     }
    //     setAllCategoryItems(newCategory)
    // }


    // const handleOnBlurPrice = (e, handleBlur) => {
    //     const priceAfterModify = modifyPrice(e.target.value)
    //     setPrice(priceAfterModify)
    //     const newEvent = { ...e }
    //     newEvent.target.value = priceAfterModify;
    //     handleBlur(newEvent)
    // }
    // const handleOnBlurFoodName = (e, handleBlur) => {
    //     handleBlur(e)
    //     // const result = isAvaibleFood(e.target.value)
    //     // if (result) {
    //     //     setAvaibleFood(true)
    //     // }
    // }

    // console.log(categoryItems);
    React.useEffect(() => {
        getCategoryAPI()
    }, [])
    const [sameFoodName, setSameFoodName] = useState()
    const [availableFood, setAvailableFood] = useState()
    const [categoryData, setCategoryData] = useState([])
    const isSameFoodName = (values) => {
        for (let i = 0; i < values.foodItems.length - 1; i++) {
            for (let j = i + 1; j < values.foodItems.length; j++) {
                if (values.foodItems[i].foodName.toLowerCase().trim() === values.foodItems[j].foodName.toLowerCase().trim()) {
                    setSameFoodName(j)
                    return true
                }
            }
        }
        return false;
    }
    const getCategoryAPI = () => {
        axios.get(`${DOMAIN}/api/category/getall`)
            .then(response => {
                console.log('response', response.data.listdata);
                setCategoryData(response.data.listdata);
            })
            .catch(err => {
                console.log(err);
                return;
            })
    }
    const isAvailableFood = (values, categoryData) => {
        console.log('xet is available', categoryData);

        for (let i = 0; i < values.foodItems.length; i++) {
            for (let j = 0; j < categoryData.length; j++) {
                if (values.foodItems[i].foodName.toLowerCase().trim() === categoryData[j].foodName.toLowerCase().trim()) {
                    setAvailableFood(i)
                    return true
                }
            }
        }
        return false;
    }
    const handleSubmitCategory = (values) => {
        console.log('values submit', values)
        if (isSameFoodName(values) === false) {
            // const categoryData = () => {
            //     return getCategoryAPI();
            // }
            const result = isAvailableFood(values, categoryData)
            if (result == false) {
                console.log('la khong co mon trung a');
                const newCategory = {
                    listCategoryRequest: [...values.foodItems]
                }
                axios.post(`${DOMAIN}/api/category/saveAll`, newCategory,
                    {
                        withCredentials: false
                    })
                    .then(res => {
                        console.log(res)
                        toast.success('Thêm món thành công')
                        navigate('../category')

                    })
                //     .catch(err => console.log(err))
            }
            else {
                console.log('bi trung mon roi a');

            }

        }


    }

    return (
        <div>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Formik validateOnChange={true}
                    validateOnInput={true}
                    validateOnBlur={true}
                    enableReinitialize={true}
                    initialValues={allCategoryItems}
                    validationSchema={CategorySchema2}
                    onSubmit={(values, { setSubmitting }) => {
                        handleSubmitCategory(values)
                        setSubmitting(false);
                    }}

                >
                    {({ isValid, handleChange, handleBlur, isSubmitting, errors, touched }) => (
                        <Form style={{ width: '100%' }} >
                            <Card sx={{ margin: '20px', padding: '20px' }}>
                                <CardContent sx={{ minHeight: '15rem' }}>
                                    <Typography variant="h6" sx={{ paddingBottom: '20px', fontWeight: '400' }} >Thêm món ăn cho thực đơn hôm nay</Typography>
                                    {(choose1 || choose2 || allCategoryItems.foodItems) &&
                                        <Grid2 container columnSpacing={1}>
                                            <Grid2 xs={7}><InputLabelStyled >Tên món</InputLabelStyled></Grid2>
                                            <Grid2 xs={3}><InputLabelStyled >Giá tiền</InputLabelStyled></Grid2>
                                        </Grid2>
                                    }
                                    {allCategoryItems && allCategoryItems.foodItems && allCategoryItems.foodItems.map((item, index) => {
                                        return (
                                            <CollectionFields key={index} index={index} item={item} handleSetItems={handleSetItems} handleDelete={handleDelete} handleChange={handleChange} handleBlur={handleBlur} errors={errors} touched={touched} sameFoodName={sameFoodName} setSameFoodName={setSameFoodName} availableFood={availableFood} setAvailableFood={setAvailableFood} />
                                        )
                                    })}
                                    <Grid2 >
                                        <Tooltip title="Thêm món mới" >
                                            <IconButton onClick={() => handleAddNewItem()}>
                                                <AddIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Grid2>
                                </CardContent>
                                <CardActions sx={{ float: 'right' }} >
                                    <ButtonStyled color='primary' variant='contained' type='submit' disabled={!isValid || isSubmitting || Number.isInteger(sameFoodName) || Number.isInteger(availableFood)}>Thêm</ButtonStyled>
                                </CardActions>
                            </Card>
                        </Form>
                    )}
                </Formik>
            </Box>

        </div >
    );
}
export default React.memo(RadioButtons);