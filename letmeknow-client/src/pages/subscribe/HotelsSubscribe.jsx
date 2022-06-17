import { Box, Container, Grid, Typography } from '@mui/material';
import { SubscribeForm } from 'components/subscriptions/hotels/SubscribeForm';
import { AppDetails } from 'components/subscriptions/AppDetails';
import { DashboardLayout } from 'components/dashboard/DashboardLayout';

export { HotelsSubscribe };

function HotelsSubscribe({ history }) {
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
              <AppDetails avatar='/static/images/hotels.png'
                description='Checking hotel availablity'
                name='Hotels'
                url='https://www.hotels.co.il/' />
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