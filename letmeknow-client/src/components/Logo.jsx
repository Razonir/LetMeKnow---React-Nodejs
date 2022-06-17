

import Avatar from '@mui/material/Avatar';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

export { Logo };

function Logo(props) {
    return (
        <Avatar sx={{ m: 1, p: 4, bgcolor: props.color }}>
            <NotificationsActiveIcon sx={{ fontSize: 35 }} />
        </Avatar>
    )
}