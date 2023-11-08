import { styled } from '@mui/material/styles';
import { TableCell, TableRow, TextField, Stack } from '@mui/material';
export const TableHeaderStyled = styled(TableCell)(() => ({
    fontSize: '12px',
    fontFamily: '"Public Sans", sans-serif',
    fontWeight: '600',
    lineHeight: '1',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    backgroundColor: 'rgb(248, 249, 250)',
    color: 'rgb(47, 55, 70)',
    paddingTop: '10px',
    paddingBottom: '10px',
}));
export const TableCellStyled = styled(TableCell)(() => ({
    // padding: '36px 0',
    lineHeight: '1',
}));

export const TableRowStyled = styled(TableRow)(() => ({
    padding: '16px 0',
}));
export const TextFieldStyled = styled(TextField)(() => ({
    // marginTop: '10px'
}));
export const StackStyled = styled(Stack)(() => ({
    paddingBottom: '15px', paddingTop: '15px'
}));