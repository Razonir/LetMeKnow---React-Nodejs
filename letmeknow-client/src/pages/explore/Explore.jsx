
import { useState } from "react";
import { Grid } from '@mui/material';
import { AppCard } from 'components/AppCard';
import { DashboardLayout } from 'components/dashboard/DashboardLayout';
import {
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon, Typography
} from '@mui/material';
import { Search as SearchIcon } from 'icons/search';

function Explore() {
  const [keywords, setKeywords] = useState("");
  const apps = [
    { 'route': 'explore/alice', 'name': 'Alice', 'description': 'Flight Tickets', 'logo': '/static/images/alice.png' },
    { 'route': 'explore/eventim', 'name': 'Eventim', 'description': 'Shows Tickets', 'logo': '/static/images/eventim.png' },
    { 'route': 'explore/gulliver', 'name': 'Gulliver', 'description': 'Travel Tickets', 'logo': '/static/images/gulliver.png' },
    { 'route': 'explore/hotels', 'name': 'Hotels', 'description': 'Checking hotel availablity', 'logo': '/static/images/hotels.png' }
  ];
  return (
    <DashboardLayout>
      <Typography
        sx={{ m: 1 }}
        variant="h4"
      >
        Explore Applications
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                onChange={event => { setKeywords(event.target.value) }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        color="action"
                        fontSize="small"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search applications"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Grid
        sx={{ mt: 2 }}
        container
        spacing={3}
      >
        {apps.filter(app => app.name.toLowerCase().includes(keywords.toLowerCase()) ||
          app.description.toLowerCase().includes(keywords.toLowerCase())).map(app => (
            <Grid
              item
              lg={3}
              sm={6}
              xl={3}
              xs={12}
            >
              <AppCard route={app.route} name={app.name} description={app.description} logo={app.logo} />
            </Grid>
          ))}
      </Grid>
    </DashboardLayout>
  );
}

export { Explore };