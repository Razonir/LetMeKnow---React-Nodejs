import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import { NotificationsLayout } from 'components/notifications/NotificationsLayout';
import { Grid } from '@mui/material';
import { NotCard } from 'components/NotCard';
import {
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon, Typography,  Button

} from '@mui/material';
import { useNotificationActions } from "actions";
import DeleteIcon from '@mui/icons-material/Delete';


export { Notifications };
function Notifications() {

  const notifications = useNotificationActions();
  const [nots, setNots] = useState([]);
  const [notsLength, setNotsLength] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      const not = await notifications.getAllNotificationsToPage();
      setNots(not.data);
      setNotsLength(not.data.length);
    }
    fetchData().catch(console.error);
  }, []);

  
  async function handleClick(id) {
    await notifications.deleteNotification(id);

    const fetchData = async () => {
      const not = await notifications.getAllNotificationsToPage();
      setNots(not.data);
    }

    fetchData().catch(console.error);
  }



  return (
    <NotificationsLayout>
      <Typography
        sx={{ m: 1 }}
        variant="h4"
      >
        Notifications: {notsLength} Results
      </Typography>
      <Grid
        sx={{ mt: 1 }}
        container
        spacing={0}
      >
        {Object.keys(nots).map((keyName) => (
          <Grid>
            <Card
              sx={{ marginLeft: '10px', marginBottom: '20px' }}>
              <NotCard appName={nots[keyName].appName} title={nots[keyName].title} info={nots[keyName].info}  url="/static/images/" end=".png"/>
              <Grid container justifyContent="center" alignItems="center" sx={{ p: 2 }} >
                <Button variant="outlined" onClick={() => { handleClick(nots[keyName]._id) }} startIcon={<DeleteIcon />}>
                  Remove
                </Button>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>

    </NotificationsLayout>

  );
}