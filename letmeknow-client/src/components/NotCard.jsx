import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';

export const NotCard = (props) => (
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
          sx={{ justifyContent: 'space-between'}}
          style={{display:'flex'}}>
          <Avatar
              src={`${props.url}${props.appName}${props.end}`}
              sx={{ 
                backgroundColor: 'error.main',
                height: 56,
                width: 56  
              }}
            /> 
          <Grid item style={{textAlign:'center'}}>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="overline"
            >
              {props.title}
            </Typography><br />
            <Typography
              color="textSecondary"
              gutterBottom
              variant="overline"
            >
              {props.info}
            </Typography>
            <br></br>
  
          </Grid>

        </Grid>
        
      </CardContent>

    </Card>
);