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

const departments = [
  {
    value: 'TOUR',
    label: 'Tourists'
  },
  {
    value: 'TOURPLUS',
    label: 'Tourists Plus'
  },
  {
    value: 'BUSINESS',
    label: 'Business'
  },
  {
    value: 'FIRST',
    label: 'First'
  }
];

export const SubscribeForm = (props) => {
  const [apiError, setApiError] = useState(null);
  const [apiSuccess, setApiSuccess] = useState(null);
  const subscriptionActions = useSubscriptionActions();
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const vertical = 'bottom';
  const horizontal = 'center';
  const [values, setValues] = useState({
    from: 'TLV',
    to: 'NYC',
    date: '',
    adults: '1',
    children: '0',
    department: 'TOUR'
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
      subscriptionActions.addSubscription('alice', values)
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
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="From"
                  name="from"
                  onChange={handleChange}
                  required
                  value={values.from}
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
                  label="To"
                  name="to"
                  onChange={handleChange}
                  required
                  value={values.to}
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
                  label="Date"
                  value={values.date}
                  // inputFormat="dd-mm-yyyy"
                  onChange={(newValue) => {
                    setValues({
                      ...values,
                      'date': newValue
                    });
                  }}
                  minDate={new Date()}
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Number of Adults"
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
                  required
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
                  label="Select Department"
                  name="department"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.department}
                  variant="outlined"
                >
                  {departments.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
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
