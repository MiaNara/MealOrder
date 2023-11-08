import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddFood2 from './AddFoodForm';
export default function AddFood({ foodAdded, BillData }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} sx={{ marginTop: '30px', marginBottom: '30px' }}>
        Thêm món
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Chọn món để thêm"}
        </DialogTitle>
        <DialogContent>
          <AddFood2 handleClose={handleClose} foodAdded={foodAdded} BillData={BillData} />
        </DialogContent>

      </Dialog>
    </div>
  );
}