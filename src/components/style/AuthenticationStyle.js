import { Container, Card, Grid, Typography, Button, InputLabel, OutlinedInput } from '@mui/material';
import { styled } from '@mui/material/styles';

///Box component -------------------------------
export const CardStyled = styled(Card)(() => ({
    maxWidth: 575,
    minWidth: 345,
    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px',
    border: 'rgb(230, 235, 241)',
    borderRadius: '8px',
    backgroundColor: 'rgb(255, 255, 255)',
    color: 'rgb(38, 38, 38)',
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    overflow: 'hidden'

}));
export const GridContainerStyled = styled(Grid)(() => ({
    boxSizing: 'border-box',
    display: 'flex',
    flexFlow: 'row wrap',
    marginTop: '-24px',
    width: 'calc(100% + 24px)',
    marginLeft: '-24px',
    padding: '32px'
}));
export const ContainerStyled = styled(Container)(() => ({
    width: '100%',
    display: 'flex',
    margin: '0 auto',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem 0'
    , marginTop: '5rem'
}));
export const GridItemStyled = styled(Grid)(() => ({
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: '24px',
    alignItems: 'baseline',
    marginLeft: '24px',
}));
export const TypographyStyled = styled(Typography)(() => ({
    fontSize: '1.5rem',
    lineHeight: '1.33',
    fontFamily: '"Public Sans", sans-serif',
    fontWeight: '600'
}));

//Form component -------------------------------
export const InputLabelStyled = styled(InputLabel)(() => ({
    fontSize: '0.875rem',
    lineHeight: '1.4375em',
    fontFamily: '"Public Sans", sans-serif',
    fontWeight: '400',
    marginBottom: '3px',
}));
export const OutlinedInputStyled = styled(OutlinedInput)(() => ({
    fontSize: '0.9rem',
    lineHeight: '1.1em',
    fontFamily: '"Public Sans", sans-serif',
    fontWeight: '400',

}));
export const ButtonStyled = styled(Button)(() => ({
    backgroundColor: ' rgb(24, 144, 255)',
    marginTop: '20px',
    color: 'white',
    fontFamily: '"Public Sans", sans-serif',
    // textTransform: 'capitalize',
    textTransform: 'inherit',
    ":hover": {
        opacity: 'rgb(9, 109, 217)',
        color: 'white'
    },
}));
export const ButtonStyled2 = styled(Button)(() => ({
    backgroundColor: 'white',
    color: ' gray',
    borderColor: 'gray',
    opacity: '0.8',
    fontFamily: '"Public Sans", sans-serif',
    textTransform: 'inherit',
    ":hover": {
        opacity: '1',
        color: 'white',
        backgroundColor: 'orange',
        borderColor: '#F28C28',

    },
}));
// ----------------------------------------------------