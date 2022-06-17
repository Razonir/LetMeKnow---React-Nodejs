import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';

export const AppDetails = (props) => {
  const openApp = (url) => {
    window.open(url, "_blank")
  }

  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={props.avatar}
            sx={{
              height: 64,
              mb: 2,
              width: 64
            }}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
            {props.name}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {`${props.description}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
          onClick={() => openApp(props.url)}
        >
          Visit Website
        </Button>
      </CardActions>
    </Card>
  );
}