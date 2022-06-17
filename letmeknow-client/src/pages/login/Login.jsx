import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { authAtom } from "state";
import { useUserActions } from "actions";
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { GoogleLogin } from "react-google-login";
import { Link } from 'react-router-dom';
import validator from 'validator';
import { LoadingButton } from '@mui/lab';
import { Logo } from 'components/Logo';
import "./Login.css";
import { updateSidebar } from "components/dashboard";
export { Login };

function Login({ history }) {
	const [email, setEmail] = useState(null);
	const [emailError, setEmailError] = useState(null);
	const [password, setPassword] = useState(null);
	const [passwordError, setPasswordError] = useState(null);
	const [apiError, setApiError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const auth = useRecoilValue(authAtom);
	const userActions = useUserActions();

	useEffect(() => {
		// redirect to home if already logged in
		if (auth) history.push("/");

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const validateEmail = (email) => {
		if (email == null) {
			return false;
		}

		if (email === "") {
			setEmailError('Empty field!');
			return false;
		}

		if (!validator.isEmail(email)) {
			setEmailError('Enter valid Email!');
			return false;
		}

		setEmailError(null);
		return true;
	}

	const validatePassword = (password) => {
		if (password == null) {
			return false;
		}

		if (password === "") {
			setPasswordError('Empty field!');
			return false;
		}

		setPasswordError(null);
		return true;
	}

	function handleSubmit(event) {
		event.preventDefault();

		if (validateEmail(email) && validatePassword(password)) {
			setIsLoading(true);
			userActions.login(email, password)
				.then(() => {
					setIsLoading(false);
					updateSidebar();
					history.push("/");
				}).catch((error) => {
					setIsLoading(false);
					setApiError(error);
				});
		}
	}

	async function handleGoogleLogin(data){
		setIsLoading(true);
		userActions.googleLogin(data.tokenId)
			.then(() => {
				setIsLoading(false);
				updateSidebar();
				history.push("/");
			}).catch((error) => {
				setIsLoading(false);
				setApiError(error);
			});
		
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 1,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Logo color='secondary.main' />
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				{apiError && (
					<div className="mt-4 mb-0" style={{ color: "#de0449" }}>
						{apiError}
					</div>
				)}
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
					<TextField
						margin="dense"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						value={email || ""}
						onChange={event => { setEmail(event.target.value); validateEmail(event.target.value) }}
						error={emailError != null}
						helperText={emailError ? emailError : ' '}
					/>
					<TextField
						margin="dense"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						value={password || ""}
						onChange={event => { setPassword(event.target.value); validatePassword(event.target.value) }}
						error={passwordError != null}
						helperText={passwordError ? passwordError : ' '}
					/>
					<LoadingButton
						type="submit"
						fullWidth
						variant="contained"
						disabled={(email == null || password == null || emailError || passwordError)}
						loading={isLoading}
						sx={{ mt: 2, mb: 2, p: 1 }}
					>
						Sign In
					</LoadingButton >
					<GoogleLogin
						sx={{ mt: 3, mb: 2 }}
						buttonText="Sign In with Google"
						cookiePolicy={"single_host_origin"}
						className="google-btn"
						clientId='778066743071-dq5qlh8n67o54sqrgds2gof341sn7san.apps.googleusercontent.com'
						onSuccess={handleGoogleLogin}
					/>
					<Grid
						sx={{ mt: 5, mb: 2 }}
						container
						spacing={0}
						direction="column"
						alignItems="center"
						justify="center">
						<Grid item>
							<Link to="/signup" variant="body2">{"Don't have an account? Sign Up"}</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}
