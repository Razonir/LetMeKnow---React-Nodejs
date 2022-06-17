import { Box, Container, Grid, Typography } from '@mui/material';
import { SubscribeForm } from 'components/subscriptions/eventim/SubscribeForm';
import { AppDetails } from 'components/subscriptions/AppDetails';
import { DashboardLayout } from 'components/dashboard/DashboardLayout';

export { EventimSubscribe };

function EventimSubscribe({ history }) {
  return (
    <DashboardLayout>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2
        }}
      >
        <Container maxWidth="lg">
          <Typography
            sx={{ mb: 3 }}
            variant="h4"
          >
            Subscribe
          </Typography>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              <AppDetails avatar='/static/images/eventim.png'
                description='Shows Tickets'
                name='Eventim'
                url='https://www.eventim.co.il/' />
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              <SubscribeForm history={history} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </DashboardLayout>
  );
}