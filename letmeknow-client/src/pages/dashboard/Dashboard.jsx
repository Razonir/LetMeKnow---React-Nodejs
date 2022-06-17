import React, { useState, useEffect } from 'react';
import { DashboardLayout } from 'components/dashboard/DashboardLayout';
import { Grid } from '@mui/material';
import { SubCard } from 'components/SubCard';
import { Search as SearchIcon } from 'icons/search';
import {
  Card,
  Typography,
  InputAdornment,
  SvgIcon,
  Box,
  CardContent,
  TextField,
  Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSubscriptionActions } from "actions";
import './Dashboard.css'

export { Dashboard };

function Dashboard() {
  const [keywords, setKeywords] = useState("");
  const subscription = useSubscriptionActions();
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const sub = await subscription.getAllSubscriptions();
      setSubs(sub.data);
      console.log(sub.data)
    }

    fetchData().catch(console.error);
  }, []);


  async function handleClick(id) {
    await subscription.deleteSubsription(id);

    const fetchData = async () => {
      const sub = await subscription.getAllSubscriptions();
      setSubs(sub.data);
    }

    fetchData().catch(console.error);
  }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <DashboardLayout>
      <Typography
        sx={{ m: 1}}
        variant="h4"
      >
        Dashboard
      </Typography>
      <Typography
        sx={{ m: 1 }}
        variant="h6"
      >
        Here you can manage your subscriptions
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
        {subs.filter(sub => keywords == null || (sub.appName.toLowerCase().includes(keywords.toLowerCase()) || (sub.details.date != null &&
            sub.details.date.toLowerCase().includes(keywords.toLowerCase())))).map(sub => (
              <Grid
                item
                lg={3}
                sm={6}
                xl={3}
                xs={12}
              >
                <Card
                  sx={{ marginLeft: '10px', marginBottom: '20px' }}>
                  <SubCard name={capitalizeFirstLetter(sub.appName)} from={sub.details.from} to={sub.details.to} date={sub.details.date?sub.details.date:sub.details.startDate} url="/static/images/" end=".png" />
                  <Grid container justifyContent="center" alignItems="center" sx={{ p: 2 }} >
                    <Button variant="outlined" onClick={() => { handleClick(sub._id) }} startIcon={<DeleteIcon />}>
                      Cancel
                    </Button>
                  </Grid>
                </Card>
              </Grid>
            ))}
      </Grid>
    </DashboardLayout>
  );
}