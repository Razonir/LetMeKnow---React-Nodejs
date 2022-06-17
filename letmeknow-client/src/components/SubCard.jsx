import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';

export const SubCard = (props) => (
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
              src={`${props.url}${props.name}${props.end}`}
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
              {props.from}
            </Typography>-
            <Typography
              color="textSecondary"
              gutterBottom
              variant="overline"
            >
              {props.to}
            </Typography>
            <br></br>
            <Typography
              color="textDate"
              gutterBottom
              variant="overline"
            >
              {props.date}
            </Typography>

          </Grid>

        </Grid>
        
      </CardContent>

    </Card>
);