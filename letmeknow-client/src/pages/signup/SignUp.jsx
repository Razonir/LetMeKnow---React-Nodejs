import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { authAtom } from "state";
import { useUserActions } from "actions";
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import validator from 'validator'
import { LoadingButton } from '@mui/lab';

export { SignUp };

function SignUp({ history }) {
	const [email, setEmail] = useState(null);
	const [emailError, setEmailError] = useState(null);
	const [password, setPassword] = useState(null);
	const [passwordError, setPasswordError] = useState(null);
	const [rePassword, setRePassword] = useState(null);
	const [rePasswordError, setRePasswordError] = useState(null);
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

	const validateRePassword = (rePassword) => {
		if (rePassword == null) {
			return false;
		}

		if (rePassword === "") {
			setRePasswordError('Empty field!');
			return false;
		}

		if (rePassword !== password) {
			setRePasswordError('Passwords do not match!');
			return false;
		}

		setRePasswordError(null);
		return true;
	}

	function handleSubmit(event) {
		event.preventDefault();

		if (validateEmail(email) && validatePassword(password)) {
			setIsLoading(true);
			userActions.signup(email, password)
				.then(() => {
					setIsLoading(false);
					history.push("/");
				}).catch((error) => {
					setIsLoading(false);
					setApiError(error);
				});
		}
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
				<Avatar sx={{ m: 1, p: 4, bgcolor: 'secondary.main' }}>
					<NotificationsActiveIcon sx={{ fontSize: 35 }} />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign Up
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
					<TextField
						margin="dense"
						required
						fullWidth
						name="repassword"
						label="RePassword"
						type="password"
						id="repassword"
						autoComplete="re-password"
						value={rePassword || ""}
						onChange={event => { setRePassword(event.target.value); validateRePassword(event.target.value) }}
						error={rePasswordError != null}
						helperText={rePasswordError ? rePasswordError : ' '}
					/>
					<LoadingButton
						type="submit"
						fullWidth
						variant="contained"
						disabled={(email == null || password == null || rePassword == null || emailError || passwordError || rePasswordError)}
						loading={isLoading}
						sx={{ mt: 2, mb: 2, p: 1 }}
					>
						Sign Up
					</LoadingButton >
				</Box>
			</Box>
		</Container>
	);
}
