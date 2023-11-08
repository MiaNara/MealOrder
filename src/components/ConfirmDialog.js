import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function ConfirmDialog({ name, deleteAll }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleDelete = () => {
        setOpen(false);
        deleteAll();
    };
    const theme = createTheme({
        palette: {
            secondary: {
                main: '#bdbdbd',
                contrastText: '#fff',

            },

        },
    });
    return (
        <div>
            <Tooltip title="Xóa tất cả" sx={{ marginLeft: '2.5rem' }}>
                <IconButton onClick={handleClickOpen}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Bạn có chắc chắn?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn có chắc chắn sẽ xóa hết tất cả {name}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <ThemeProvider theme={theme}>
                        <Button color='error' variant='contained' onClick={handleDelete} sx={{ paddingRight: '2rem', paddingLeft: '2rem', paddingTop: '0.7rem', paddingBottom: '0.7rem', lineHeight: '1' }} >
                            Xóa
                        </Button>
                        <Button variant='contained' color='secondary' onClick={handleClose} autoFocus sx={{ paddingRight: '1.5rem', paddingLeft: '1.5rem', paddingTop: '0.7rem', paddingBottom: '0.7em', lineHeight: '1' }} >Trở lại</Button>
                    </ThemeProvider>
                </DialogActions>
            </Dialog>
        </div>
    );
}