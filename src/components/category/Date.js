import React from "react";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { ButtonStyled } from '../style/AuthenticationStyle'
import { Box } from "@mui/material";

export default function Date({ setFromDate, setToDate }) {
    const initValues = {
        startDate: dayjs(),
        endDate: dayjs()
    }
    const [startDate, setStartDate] = React.useState(initValues.startDate);
    const [endDate, setEndDate] = React.useState(initValues.endDate);

    const handleChangeStartDate = (newValue) => {
        console.log(dayjs(newValue));
        const result = dayjs(newValue).isAfter(dayjs(endDate));
        if (result) {
            setStartDate(dayjs(endDate))
            setEndDate(dayjs(newValue))
        } else {
            setStartDate(dayjs(newValue))
        }
    }

    const handleChangeEndDate = (newValue) => {
        console.log(dayjs(newValue));
        const result = dayjs(newValue).isBefore(dayjs(startDate));
        if (result) {
            setEndDate(dayjs(startDate))
            setStartDate(dayjs(newValue))
        }
        else {
            setEndDate(dayjs(newValue))
        }
    }

    const getDate = (e) => {
        e.preventDefault();
        const fromDate = dayjs(startDate).format('YYYY-MM-DD');
        const toDate = dayjs(endDate).format('YYYY-MM-DD');
        setFromDate(fromDate);
        setToDate(toDate);
    }

    return (
        <div >
            <Box >
                <form onSubmit={(e) => getDate(e)}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DemoContainer components={['DatePicker', 'DatePicker']}  >
                            <Grid2 container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Grid2 xs='auto' >
                                    <DatePicker
                                        sx={{ width: { md: '20rem', sm: '13rem', xs: '10.5rem' }, marginRight: { xs: '5px' }, marginBottom: { xs: '10px', sm: 0 } }}
                                        label="Ngày bắt đầu"
                                        value={startDate}
                                        format="DD/MM/YYYY"
                                        onChange={(newValue) => handleChangeStartDate(newValue)}
                                    />
                                </Grid2>
                                <Grid2 xs='auto' >
                                    <DatePicker
                                        sx={{ width: { md: '20rem', sm: '13rem', xs: '10.5rem' }, marginRight: { sm: '5px' }, marginBottom: { xs: '10px', sm: 0 } }}
                                        disableFuture
                                        label="Ngày kết thúc"
                                        value={endDate}
                                        format="DD/MM/YYYY"
                                        onChange={(newValue) => handleChangeEndDate(newValue)}
                                    />
                                </Grid2>
                                <Grid2 xs='auto' >
                                    <ButtonStyled variant='contained' sx={{ fontSize: '15px', width: { xs: '20rem', sm: '5rem', md: '5rem' }, height: { sm: '55px' }, marginBottom: { sm: '20px' }, marginTop: { md: '16px' }, alignContent: 'baseline' }} type='submit'>Xem</ButtonStyled>
                                </Grid2>
                            </Grid2>
                        </DemoContainer>
                    </LocalizationProvider>
                </form>

            </Box>
        </div>
    );
}
