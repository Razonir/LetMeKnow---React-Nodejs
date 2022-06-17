import { useState } from 'react';
import { Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { DashboardLayout } from 'components/dashboard/DashboardLayout';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Divider
} from '@mui/material';
import { useUserActions } from "actions";

export const Contactus = (props) => {

  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phonenumber: '',
    contant: ''
  }); 
  
  const userActions = useUserActions();

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const onSubmit = (e) =>{
    userActions.contactUs( values.firstName, values.lastName, values.email, values.phonenumber, values.contant )
    alert("Email sent to administrator we will contact you shortly :)");
  }

  return (

    <DashboardLayout>
      <form onSubmit={onSubmit}>
      <Card>
        <CardHeader
          subheader="Fill your details and we will get back to you soon"
          title="Contact Us"
        />
        <Divider />
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
                  label="First Name"
                  name="firstName"
                  onChange={handleChange}
                  type="text"
                  required
                  value={values.firstName}
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
                  label="Last Name"
                  name="lastName"
                  onChange={handleChange}
                  required
                  type="text"
                  value={values.lastName}
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
                  label="Email"
                  name="email"
                  onChange={handleChange}
                  type="text"
                  required
                  value={values.email}
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
                  label="Phone Number"
                  name="phonenumber"
                  onChange={handleChange}
                  type="text"
                  required
                  value={values.phonenumber}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
              >
                <TextField

                  fullWidth
                  label="Message"
                  name="message"
                  multiline
                  rows={4}
                  onChange={handleChange}
                  type="text"
                  required
                  value={values.message}
                  variant="outlined"
                />
              </Grid>
            </Grid>
        </CardContent>
        <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: 2
            }}
          >
      <LoadingButton variant="contained" type="submit">Send</LoadingButton>
            </Box>
      </Card>

</form>
    </DashboardLayout>
  );
}

