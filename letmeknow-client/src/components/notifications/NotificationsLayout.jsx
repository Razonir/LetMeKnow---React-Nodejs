import { DashboardNavbar, DashboardSidebar } from 'components/dashboard';
import { useState } from 'react';
import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const NotificationsLayoutRoot = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
    paddingTop: 70,
    [theme.breakpoints.up('lg')]: {
        paddingLeft: 280
    }
}));

export const NotificationsLayout = (props) => {
    const { children } = props;
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <NotificationsLayoutRoot>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        py: 1
                    }}
                >
                    <Container maxWidth={false}>
                        {children}
                    </Container>
                </Box>
            </NotificationsLayoutRoot>
            <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
            <DashboardSidebar
                onClose={() => setSidebarOpen(false)}
                open={isSidebarOpen}
            />
        </>
    );
}