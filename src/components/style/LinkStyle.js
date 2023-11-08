import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';

export const LinkStyled = styled(NavLink)(() => ({
    textDecoration: 'none',
    margin: '2rem',
    color: '#000',
    fontSize: '1rem',
    fontWeight: '600',
    padding: '5px',
    borderBottom: '2px solid white',
    ":hover": {
        color: 'orange',

    }
}));