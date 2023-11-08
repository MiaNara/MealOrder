import React from 'react'
import CollectionForm from './CollectionForm'
import Layout from '../layout/Layout'
import { Box, Radio, RadioGroup, FormControl, FormControlLabel, } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2';
import { useState, useEffect } from 'react';
import CollectionList from './CollectionList';
import axios from 'axios'

export default function Collection() {
    const DOMAIN = process.env.REACT_APP_DOMAIN;
    const [data, setData] = useState([{ foodItems: [{ foodName: 'Đang tải thực đơn', price: '' }] }, { foodItems: [{ foodName: 'Đang tải thực đơn', price: '' }] }])
    const [listData, setListData] = useState({})
    const [listData2, setListData2] = useState({})
    const getCollectionList = async () => {
        await axios.get(`${DOMAIN}/api/category/getCategoryLimit`)
            .then(response => {
                return response.data.listdata;
            })
            .then((coList) => {
                let list1 = [];
                let list2 = [];
                let typeOfDate = Date.parse(coList[0].createDate);
                for (let i = 0; i < coList.length; i++) {
                    let category = {
                        foodName: coList[i].foodName,
                        price: coList[i].price
                    }
                    if (Date.parse(coList[i].createDate) === typeOfDate) {
                        list1.push(category)
                    } else {
                        list2.push(category)
                    }
                }
                const data1 = { foodItems: [...list1] };
                const data2 = { foodItems: [...list2] };
                setListData(data1)
                setListData2(data2)
                return { data1, data2 }
            })
            .then(({ data1, data2 }) => {
                const list = [data1, data2]
                setData(list)
            })
            .catch(err => {
                console.log(err);
            })
    }
    useEffect(() => {
        getCollectionList()
    }, [])

    const [selectedValue, setSelectedValue] = React.useState('');
    const [choose1, setChoose1] = useState(false);
    const [choose2, setChoose2] = useState(false);

    const handleClick = (event) => {
        console.log('onclick ne')
        if (event.target.value == '1' && choose1) {
            setChoose1(false)
        } else if (event.target.value == '2' && choose2) {
            setChoose2(false)
        }
    }
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        if (event.target.value == '1' && !choose1) {
            setChoose1(true)
            setChoose2(false)

        } else if (event.target.value == '2' && !choose2) {
            setChoose2(true)
            setChoose1(false)
        }
    };

    return (
        <Layout>
            <Grid2 container sx={{ minHeight: "75vh", marginTop: "6rem" }}>
                <Grid2 xs={12} md={7} mdOffset={1} mt={3} >
                    <CollectionForm choose1={choose1} choose2={choose2} listData={listData} listData2={listData2} />
                </Grid2>
                <Grid2 xs={12} md={4} >
                    <Grid2 xs={12} >
                        <Box sx={{ justifyContent: { md: 'start', xs: 'center' }, display: 'flex' }}>
                            <FormControl  >
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel value="1" control={<Radio
                                        checked={selectedValue === '1' && choose1}
                                        onChange={handleChange}
                                        onClick={handleClick}
                                        value="1"
                                        name="radio-buttons"
                                        inputProps={{ 'aria-label': 'Menu 1' }}
                                    ></Radio>} label="Menu 1" />
                                    <FormControlLabel value="2" control={<Radio
                                        checked={selectedValue === '2' && choose2}
                                        onClick={handleClick}
                                        onChange={handleChange}
                                        value="2"
                                        name="radio-buttons"
                                        inputProps={{ 'aria-label': 'Menu 2' }}
                                    ></Radio>} label="Menu 2" />
                                </RadioGroup>
                            </FormControl>
                        </Box>

                    </Grid2>
                    <Grid2 xs={12} xsOffset={1} smOffset={2} md={4} mdOffset={0} sx={{ display: 'flex' }}>
                        <CollectionList data={data} />
                    </Grid2>
                </Grid2>
            </Grid2>
        </Layout>
    )
}
