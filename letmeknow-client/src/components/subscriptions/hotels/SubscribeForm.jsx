import { useState } from 'react';
import * as React from 'react';
import { useSubscriptionActions } from "actions";
import { LoadingButton } from '@mui/lab';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export const SubscribeForm = (props) => {
  const [apiError, setApiError] = useState(null);
  const [apiSuccess, setApiSuccess] = useState(null);
  const subscriptionActions = useSubscriptionActions();
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const vertical = 'bottom';
  const horizontal = 'center';
  const [values, setValues] = useState({
    url: '',
    startDate: new Date(),
    endDate: '',
    adults:'2',
    children: '0',
    infants: "0"
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  function handleSubmit(event) {
    event.preventDefault();

    if (true) {
      setIsLoading(true);
      subscriptionActions.addSubscription('hotels', values)
        .then(() => {
          setIsLoading(false);
          setApiError(null);
          setApiSuccess("Successfully added subscription!");
        }).catch((error) => {
          setIsLoading(false);
          setApiError(error);
          setApiSuccess(null);
        });
    }
  }

  const handleClose = () => {
    setApiSuccess(null);
  };
  //https://www.hotelscombined.co.il/hotels/The-Strand-Palace-Hotel,%D7%9C%D7%95%D7%A0%D7%93%D7%95%D7%9F-c28501-h120285-details/2022-05-25T13:45:06.000Z/2022-05-26T13:45:16.000Z/2adults/0children/1rooms/\
  //const API_URL="https://www.hotelscombined.co.il/hotels/{at}/{startDate}/{endDate}/{adults}/{childen}children/{rooms}rooms?sort=price_a"
//https://res.hotels.co.il/reservation/search.php?hhid=317&currency=he&searchBy=hotel&fromDate=2022-05-25&toDate=2022-05-27&adults=2&children=0&infants=0&search=בדוק+זמינות
  return (
    <>
      <Snackbar anchorOrigin={{ vertical, horizontal }} open={apiSuccess} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="success" sx={{ width: '100%' }}>
          {apiSuccess}
        </Alert>
      </Snackbar>
      <form
        autoComplete="off"
        noValidate
        {...props}
        onSubmit={handleSubmit}
      >
        <Card>
          <CardHeader
            subheader="Fill all subscription details"
            title="Information"
          />
          <Divider />
          <Box sx={{ m: 3 }}>
            {apiError && (
              <div className="mt-4 mb-0" style={{ color: "#de0449" }}>
                {apiError}
              </div>
            )}
          </Box>
          <CardContent>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Hotel's URL"
                  name="url"
                  onChange={handleChange}
                  required
                  value={values.url}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <DatePicker
                  renderInput={(params) => <TextField 
                    fullWidth 
                    variant="outlined" {...params} />}
                  label="start Date"
                  value={values.startDate}
                  onChange={(newValue) => {
                    setValues({
                      ...values,
                      'startDate': newValue
                    });
                  }}
                  minDate={new Date()}
                  maxDate={values.endDate}
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <DatePicker
                  renderInput={(params) => <TextField 
                    fullWidth 
                    variant="outlined" {...params} />}
                  label="end Date"
                  value={values.endDate}
                  onChange={(newValue) => {
                    setValues({
                      ...values,
                      'endDate': newValue
                    });
                  }}
                  minDate={values.startDate}
                  />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Number of adults"
                  name="adults"
                  onChange={handleChange}
                  type="number"
                  value={values.adults}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Number of children"
                  name="children"
                  onChange={handleChange}
                  type="number"
                  value={values.children}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Number of infants"
                  name="infants"
                  onChange={handleChange}
                  type="number"
                  value={values.infants}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: 2
            }}
          >
            <LoadingButton
              color="primary"
              variant="contained"
              type="submit"
              loading={isLoading}
              isDisabled={isDisabled}
            >
              Let Me Know
            </LoadingButton>
          </Box>
        </Card>
      </form>
    </>
  );
};
