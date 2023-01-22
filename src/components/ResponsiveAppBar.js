import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

const pages = ['라이브 관리', '교구 관리'];
const settings = ['로그아웃', '계정 관리'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (i) => {
    if (i === 0) {
      navigate(`/class`);
    } else if (i === 1) {
      navigate(`/material`);
    }
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    localStorage.removeItem("name")
    localStorage.removeItem("token")
    window.location.reload()
  }

  return (
    <AppBar position="static" style={{background: "none", marginBottom: "30px", boxShadow: "none"}}>
        <Toolbar disableGutters >            
          <Typography variant="h6"
                      noWrap
                      href="/"
                      sx={{
                        mr: 2,
                        display: {xs: 'none', md: 'block'},
                        letterSpacing: '.3rem',
                        textDecoration: 'none',
                        marginTop: '20px',
                        marginBottom: '20px',
                      }}>
          <Link href="/class">
            <img
              src="https://kidsquizbucket.s3.ap-northeast-2.amazonaws.com/kidsquiz_logo.png"
              loading="lazy"
              alt=""
              style={{
                width: '30%',
                height: '100%',
                objectFit: 'cover',
                cursor: "pointer"
              }}
            />
          </Link>
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
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
            {pages.map((page) => (
              <MenuItem 
                key={page} 
                onClick={handleCloseNavMenu}>
                <Typography 
                  textAlign="center">{page}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        
        <Link href="/" underline="none">
            <Typography 
              variant="h5"
              noWrap
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                textDecoration: 'none',
              }}>
            <img
              src="https://kidsquizbucket.s3.ap-northeast-2.amazonaws.com/kidsquiz_logo.png"
              loading="lazy"
              alt=""
              style={{
                width: '30%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            </Typography>
          </Link>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {pages.map((page, index) => (
            <Button
              key={index}
              onClick={() => {
                handleCloseNavMenu(index)
              }}
              sx={{ my: 2, color: 'black',  display: 'block', fontSize: '1.2rem', fontWeight: 700, marginRight: '20px'}}
            >
              {page}
            </Button>
          ))}
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center" onClick ={logout}>{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default ResponsiveAppBar;