import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { ButtonStyled } from '../style/AuthenticationStyle'
import dayjs from 'dayjs';

export default function ExportExcelModal({ fromDate, toDate }) {
    const [open, setOpen] = React.useState(false);
    const DOMAIN = process.env.REACT_APP_DOMAIN;
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleExport = (e) => {
        e.preventDefault();
        const fDate = dayjs(fromDate).format('YYYY-MM-DD');
        const tDate = dayjs(toDate).format('YYYY-MM-DD');
        window.open(`${DOMAIN}/api/export/excel?fromDate=${fDate}&toDate=${tDate}`, '_blank', 'noopener,noreferrer')
        handleClose();
    }
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen} sx={{ margin: '20px 0', float: 'right' }}>
                Report
            </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >

                <DialogTitle id="responsive-dialog-title">
                    {"Bạn có chắc chắn muốn xuất file Excel?"}
                </DialogTitle>
                <DialogContent>
                    {`Xuất file Excel tất cả các đơn từ ${dayjs(fromDate).format('DD/MM/YYYY')} đến ${dayjs(toDate).format('DD/MM/YYYY')}`}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{ float: 'right', display: 'flex', margin: '20px 5px' }}>
                        Thoát
                    </Button>
                    <ButtonStyled sx={{ float: 'right', display: 'flex', margin: '20px 5px', textTransform: 'uppercase' }} variant='contained' onClick={handleExport}>Đồng ý</ButtonStyled>
                </DialogActions>
            </Dialog>

        </div >
    );
}