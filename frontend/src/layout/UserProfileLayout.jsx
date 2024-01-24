import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import EditIcon from '@mui/icons-material/Edit';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import { Outlet, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const drawerWidth = 240;

export default function UserProfileLayout() {

  const navigate = useNavigate();
  const { userId } = useParams();


  // Add the logic to check whether the logged in user id is equal to the entered url userId

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          zIndex: 1,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' , '&hover': {
                  bgcolor: '#1d4ed8',
                }}}>
          <List sx={{ my: 4, padding: '5px' }}>
            <ListItem disablePadding className='hover:bg-blue-200'>
              <ListItemButton onClick={()=>navigate('/user/1')}> 
              {/* provide the userid in the link */}
                <ListItemIcon>
                  <AccountBoxOutlinedIcon color='primary'/>
                </ListItemIcon>
                <ListItemText primary="View Profile"/>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding className='hover:bg-blue-200'>
              <ListItemButton onClick={()=>navigate('/user/1/edit')}> 
              {/* provide the userid in the link */}
                <ListItemIcon>
                  <EditIcon color='primary'/>
                </ListItemIcon>
                <ListItemText primary="Edit Profile"/>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding className='hover:bg-blue-200'>
              <ListItemButton onClick={()=>navigate('/user/1/1')}> 
              {/* provide the userid in the link */}
                <ListItemIcon >
                  <AccountBalanceIcon color='primary'/>
                </ListItemIcon>
                <ListItemText primary="Bank Details"/>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding className='hover:bg-blue-200'>
              <ListItemButton onClick={()=>navigate('/user/1/1/edit')}> 
              {/* provide the userid in the link */}
                <ListItemIcon >
                  <AccountBalanceIcon color='primary'/>
                </ListItemIcon>
                <ListItemText primary="Edit Bank Details"/>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3,m:2 }}>
        <Toolbar /> 
          <Outlet/>
      </Box>
    </Box>
  );
}