import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const AppCard = (props) => (
  <Link to={props.route}>
    <Card
      sx={{ height: '100%', minWidth: '300px'}}
      {...props}
    >
      <CardContent>
        <Grid
          spacing={2}
          direction="column"
          alignItems="center"
          justifyContent="center"
          container
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            <Avatar
              src={props.logo}
              sx={{
                backgroundColor: 'error.main',
                height: 56,
                width: 56
              }}
            />
          </Grid>
          <Grid item style={{textAlign:'center'}}>
            <Typography
              color="textPrimary"
              variant="h4"
            >
              {props.name}
            </Typography>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="overline"
            >
              {props.description}
            </Typography>

          </Grid>
        </Grid>
      </CardContent>
    </Card>
  </Link >
);