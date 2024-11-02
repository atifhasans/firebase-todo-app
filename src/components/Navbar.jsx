import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import AdbIcon from '@mui/icons-material/Adb';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container'; // Add this line
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../Config/firebaseconfig';
import { useState } from 'react';


const pages = ['login', 'register', 'todo', 'logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const NavButtonClick = (item) => {
    handleCloseNavMenu();
    if (item === 'logout') {
      signOut(auth)
        .then(() => {
          console.log('signout successful');
          navigate('/'); 
        })
        .catch((error) => console.error('signout unsuccessful', error));
    } else {
      navigate(`/${item}`);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            {/* Logo and App Title */}
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
              onClick={() => navigate('/')}
            >
              TODO APP
            </Typography>

            {/* Mobile Menu Icon */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
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
                {pages.map((item) => (
                  <MenuItem key={item} onClick={() => NavButtonClick(item)}>
                    <Typography textAlign="center">{item.charAt(0).toUpperCase() + item.slice(1)}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Desktop Links */}
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, fontWeight: 'bold', cursor: 'pointer' }}
              onClick={() => navigate('/')}
            >
              TODO APP
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
              {pages.map((item) => (
                <Button
                  key={item}
                  onClick={() => NavButtonClick(item)}
                  sx={{
                    mx: 1,
                    color: '#fff',
                    backgroundColor: item === 'logout' ? '#d32f2f' : 'primary.main',
                    '&:hover': {
                      backgroundColor: item === 'logout' ? '#c62828' : 'primary.dark',
                    },
                  }}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default ResponsiveAppBar;
