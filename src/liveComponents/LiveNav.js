import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


export default function LiveNav() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    //   교구제 묶음 버튼 클릭시 나오는 메뉴
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
    {/* 교구제 묶음 버튼 클릭시 나오는 메뉴 */}
    <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
        'aria-labelledby': 'basic-button',
        }}
    >
        <MenuItem onClick={handleClose}>동물놀이</MenuItem>
        <MenuItem onClick={handleClose}>사물놀이</MenuItem>
        <MenuItem onClick={handleClose}>코딩놀이</MenuItem>
    </Menu>


    <BottomNavigation sx={{ width: 400, margin: 1 }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="Recents"
        value="recents"
        icon={<RestoreIcon />}
      />
      <BottomNavigationAction
        label="Favorites"
        value="favorites"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        label="Nearby"
        value="nearby"
        icon={<LocationOnIcon />}
      />

      {/* 교구제 묶음 버튼 */}
      <BottomNavigationAction 
        label="Folder" 
        value="folder" 
        icon={<FolderIcon />}
        onClick={handleClick}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined} />
    </BottomNavigation>

 
  </>
  );
}