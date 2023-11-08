import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from "../context/UserContext";
import { logout } from '../context/AuthService'
import { LinkStyled } from '../style/LinkStyle';
import { ButtonStyled2 } from '../style/AuthenticationStyle';
import PersonIcon from '@mui/icons-material/Person';
function Header() {

  const { checkLoggedIn, checkAdmin, getUserData } = UserAuth();
  const isAdmin = checkAdmin();
  const hasUser = checkLoggedIn();
  const userData = getUserData();


  const navigate = useNavigate();
  const handleLogOut = () => {
    logout();
    navigate('/login');
  };
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    console.log('nav menu', event.currentTarget);
  };
  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

  return (
    <div position="static">
      <AppBar maxwidth="lg" sx={{ boxShadow: 'none', backgroundColor: 'white' }} >
        <Toolbar sx={{ marginLeft: { md: '3rem' } }}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: '"Permanent Marker", cursive',
              fontWeight: 500,
              color: 'orange',
              letterSpacing: '.3rem',
              // textTransform: 'uppercase',
              textDecoration: 'none',
              fontSize: '1.3rem',
            }}
          >
            MEALS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            {isAdmin && (
              <>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color=""
                >
                  <MenuIcon sx={{ color: 'black' }} />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  <LinkStyled to={'../category'}>
                    <MenuItem key={1} onClick={handleCloseNavMenu}>
                      Thực đơn
                    </MenuItem>
                  </LinkStyled>
                  <LinkStyled to={'../addCategory'}>
                    <MenuItem key={2} onClick={handleCloseNavMenu}>
                      Thêm món ăn
                    </MenuItem>
                  </LinkStyled>
                  <LinkStyled to={'../report'}>
                    <MenuItem key={3} onClick={handleCloseNavMenu}>
                      Report
                    </MenuItem>
                  </LinkStyled>

                </Menu>
              </>
            )}
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: '"Permanent Marker", cursive',
              fontWeight: 500,
              color: 'orange',
              letterSpacing: '.3rem',
              // textTransform: 'capitalize',
              paddingLeft: '5rem',
              textDecoration: 'none',
              fontSize: '1.3rem',
            }}
          >
            MEALS
          </Typography>
          <Box sx={{ flexGrow: 2, justifyContent: 'center', display: { xs: 'none', md: 'flex' } }}>
            {isAdmin && (
              <>
                <LinkStyled to={'../category'}
                  style={({ isActive }) => {
                    return { borderBottom: isActive ? "2px solid orange" : "2px solid white" }
                  }}>Thực đơn</LinkStyled>
                <LinkStyled to={'../addCategory'} style={({ isActive }) => {
                  return { borderBottom: isActive ? "2px solid orange" : "2px solid white" }
                }}>Thêm món ăn</LinkStyled>
                <LinkStyled to={'../report'} style={({ isActive }) => {
                  return { borderBottom: isActive ? "2px solid orange" : "2px solid white" }
                }}>Thống kê</LinkStyled>
              </>
            )}
          </Box>
          <Box sx={{ flexGrow: 0, marginRight: { md: '2rem', xs: '1rem' } }}>
            {hasUser && getUserData ? (<Stack sx={{ color: 'grey', flexDirection: 'row' }}> <PersonIcon fontSize='small' sx={{ paddingRight: '5px' }} />{userData.account}</Stack>) : (<Stack></Stack>)}
          </Box>
          <Box sx={{ flexGrow: 0, marginRight: { md: '5rem' } }}>
            <Tooltip >
              {hasUser ? (<ButtonStyled2 color='info' variant='outlined' onClick={handleLogOut}>Đăng xuất</ButtonStyled2>) : (<ButtonStyled2 component={Link} color='info' variant='outlined' to="/login">Đăng nhập</ButtonStyled2>)}
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
    </div >
  );
}
export default Header;