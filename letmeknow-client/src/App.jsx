import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { PrivateRoute } from 'components';
import { history } from 'utils';
import {Notifications} from 'pages/notifications'
import { Dashboard } from 'pages/dashboard';
import { Login } from 'pages/login';
import { SignUp } from 'pages/signup';
import { Explore } from 'pages/explore';
import { Contactus } from 'pages/contactus';
import { AliceSubscribe } from 'pages/subscribe/AliceSubscribe';
import { EventimSubscribe } from 'pages/subscribe/EventimSubscribe';
import { GulliverSubscribe } from 'pages/subscribe/GulliverSubscribe';
import { HotelsSubscribe } from 'pages/subscribe/HotelsSubscribe';
import { ThemeProvider } from '@mui/material/styles';
import { Analytics } from 'pages/analytics';
import { theme } from 'theme';
import { CssBaseline } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

export { App };

function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router history={history}>
                    <Switch>
                        <PrivateRoute exact path="/" component={Dashboard} />
                        <PrivateRoute path="/explore/alice" component={AliceSubscribe} />
                        <PrivateRoute path="/explore/eventim" component={EventimSubscribe} />
                        <PrivateRoute path="/explore/gulliver" component={GulliverSubscribe} />
                        <PrivateRoute path="/explore/hotels" component={HotelsSubscribe} />
                        <PrivateRoute path="/explore" component={Explore} />
                        <PrivateRoute path="/contactus" component={Contactus} />
                        <PrivateRoute path="/analytics" component={Analytics} />
                        <Route path="/explore/alice" component={AliceSubscribe} />
                        <Route path="/explore/eventim" component={EventimSubscribe} />
                        <Route path="/explore/gulliver" component={GulliverSubscribe} />
                        <Route path="/explore/hotels" component={HotelsSubscribe} />
                        <Route path="/explore" component={Explore} />
                        <Route path="/notifications" component={Notifications} />
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={SignUp} />
                        <Redirect from="*" to="/" />
                    </Switch>
                </Router>
            </ThemeProvider>
        </LocalizationProvider>
    );
}