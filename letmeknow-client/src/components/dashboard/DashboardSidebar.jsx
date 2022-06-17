import PropTypes from 'prop-types';
import { Box, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import { useUserActions } from 'actions';
import { Logo } from 'components/Logo';
import { NavItem } from 'components/dashboard/NavItem';
import { ChartBar as ChartBarIcon } from 'icons/chart-bar';
import { Search as SearchIcon } from 'icons/search';
import { Bell as BellIcon } from 'icons/bell';
import { useNotificationActions } from "actions";
import React, { useState, useEffect } from 'react';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import { Link } from 'react-router-dom';

const items = [
  {
    href: '/',
    icon: (<ChartBarIcon fontSize="small" />),
    title: 'Dashboard'
  },
  {
    href: '/explore',
    icon: (<SearchIcon fontSize="small" />),
    title: 'Explore'
  },
  {
    href: '/notifications',
    icon: (<BellIcon fontSize="small" />),
    title: 'Notifications'
  },
  {
    href: '/contactus',
    icon: (<ContactSupportIcon fontSize="small" />),
    title: 'Contact Us'
  }
];
export const updateSidebar=()=>{
  if(localStorage.getItem('isadmin')==='true'){
    items.push({
      href: '/analytics',
      icon: (<ChartBarIcon fontSize="small" />),
      title: 'Analytics'
    }) 
  }
}

export const DashboardSidebar = (props) => {
  const userActions = useUserActions();
  const { open, onClose } = props;
  const notifications = useNotificationActions();
  const [nots, setNots] = useState([]);
  const [notsLength, setNotsLength] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const not = await notifications.getAllNotificationsToPage();
      setNotsLength(not.data.length);
    }
    fetchData().catch(console.error);
  }, []);


  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div>
          <Box sx={{ p: 2 }}
            display="flex"
            justifyContent="center"
            alignItems="center">
            <Logo color='#111827' />
          </Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                px: 3,
                py: '11px',
                borderRadius: 1
              }}
            >
              <div style={{ width: '100%' }}>
                <Typography
                  color="inherit"
                  variant="subtitle1"
                >
                  Welcome,
                </Typography>
                <Typography
                  color="neutral.400"
                  variant="body2"
                >
                  You have <Link style={{ color: 'inherit', textDecoration: 'none'}} to="/notifications">{notsLength} notifications</Link>
                </Typography>
                <a onClick={userActions.logout} style={{
                  padding: '0',
                  color: '#ff7878'
                }}>Exit</a>
              </div>
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        <Divider sx={{ borderColor: '#2D3748' }} />
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
