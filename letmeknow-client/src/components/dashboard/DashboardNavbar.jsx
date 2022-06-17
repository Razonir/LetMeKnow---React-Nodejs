import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { AppBar, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation } from 'react-router-dom';
import { Typography } from '@material-ui/core';

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3]
}));

export const DashboardNavbar = (props) => {
  const { onSidebarOpen, ...other } = props;
  const location = useLocation();
  const generateBreadcrumbs = (pathname) => {
    if (pathname === '/') {
      return ' > Dashboard';
    }
    
    let parts = pathname.split('/');

    parts = parts.map(part => 
      part.charAt(0).toUpperCase() + part.slice(1)
    );

    return parts.join(' > ');
  }

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280
          },
          width: {
            lg: 'calc(100% - 280px)'
          }
        }}
        {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none'
              }
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Typography  style={{color: "rgb(158 158 158)"}}>
            {generateBreadcrumbs(location.pathname)}
          </Typography>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func
};