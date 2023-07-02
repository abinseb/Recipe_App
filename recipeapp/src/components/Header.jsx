import React from 'react';
import {
  AppBar,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar
      style={{ backgroundColor: '#232f3d', height: isMobile ? '120px' : '150px' }}
      position="static"
    >
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            alt="Recipe Logo"
            src={require('./images/recipe_logo1.png')}
            className="avatar-image"
            style={{ width: isMobile ? '60px' : '150px', height: isMobile ? '60px' : '150px' }}
          />

          <Typography
            variant={isMobile ? 'h6' : 'h5'}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              paddingLeft: isMobile ? '10px' : '20px',
            }}
          >
            Recipe App
          </Typography>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button color="inherit" style={{ marginLeft: isMobile ? '5px' : '20px' }}>
            <Link style={{ textDecoration: 'none' }} to={'/'}>
              <HomeSharpIcon style={{ color: '#f8f8ff' }} />
            </Link>
          </Button>
          <Button color="inherit" style={{ marginRight:isMobile ? '5px': '10px', marginLeft: isMobile ? '5px' : '20px' }}>
          <Link style={{ textDecoration: 'none',color:'white' }} to={'/indiancuisine'}>
              Indian
            </Link>
          </Button>
          <Button color="inherit" style={{ marginRight: isMobile ? '5px':'10px', marginLeft: isMobile ? '5px' : '20px' }}>
             <Link style={{ textDecoration: 'none',color:'white' }} to={'/italiancuisine'} >Italian</Link> 
          </Button>
          <Button color="inherit" style={{ marginRight: isMobile ? '5px':'10px', marginLeft: isMobile ? '5px' : '20px' }}>
            <Link style={{ textDecoration: 'none',color:'white' }} to={'/americancuisine'} >American</Link> 
          </Button>
          <Button color="inherit" style={{ marginRight: isMobile ? '5px':'10px', marginLeft: isMobile ? '5px' : '20px' }}>
            <Link style={{ textDecoration: 'none',color:'white' }} to={'/chinesecuisine'} >Chinese</Link> 
          </Button>
          <Tooltip title="Add New Cuisine">
            <IconButton color="inherit" style={{ backgroundColor: '#dcdcdc', marginRight: isMobile ? '5px':'10px', marginLeft: isMobile ? '5px' : '20px' }}>
              <Link style={{ textDecoration: 'none' }} to={'/add'}>
                <AddIcon style={{ color: '#000000' }} />
              </Link>
            </IconButton>
          </Tooltip>
         
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
