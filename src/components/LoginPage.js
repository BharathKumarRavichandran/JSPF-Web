import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from '@material-ui/core';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import { loginSubmit } from '../utils/api.helper';
import isEmail from 'validator/lib/isEmail';


const useStyles = makeStyles(theme => ({
	'@global': {
		body: {
			backgroundColor: theme.palette.common.white,
		},
	},
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	appHeader: {
		margin: '0 auto',
	},
	appBar: {
		padding: theme.spacing(2),
	},
}));

function Bar() {
	const classes = useStyles();
	return (
		<AppBar position="fixed" className={classes.appBar}>
			<Typography variant="h6" noWrap className={classes.appHeader}>
				JITHESHRAJ SCHOLARSHIP APPLICATION PORTAL 2019-2020
			</Typography>
		</AppBar>
	);
}


export default function LoginPage(props) {
	const classes = useStyles();
	const [email, setEmail] = useState();
	const [emailError, setEmailError] = useState(false);
	const [errorDisplay, setErrorDisplay] = useState(false);
	const [redirectToReferrer, setRedirectToReferrer] = useState(false);
	const [password, setPassword] = useState();
	const [passwordError, setPasswordError] = useState(false);

	const handleEmailInput = (e) => setEmail(e.target.value);
	const handlePasswordInput = (e) => setPassword(e.target.value);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if((email && isEmail(email)&&password)){
			try {
				const response = await loginSubmit(email, password);
				if (response.status == 200) {
					setErrorDisplay(false);
					props.setIsLoggedIn(true);
					setRedirectToReferrer(true);
					window.sessionStorage.setItem('session', email);
				} else if (response.status == 400) {
					setErrorDisplay(response.data.message);
				}
			} catch (error) {
				setErrorDisplay('Something went wrong',error);
			}
		}else{
			email && isEmail(email) ? setEmailError(false) : setEmailError(true);
			password ? setPasswordError(false) : setPasswordError(true);
			setErrorDisplay('Invalid email/password');
		}
	};

	if (redirectToReferrer) {
		if (props.location.state && props.location.state.from)
			return <Redirect push to={props.location.state.from} />;
		else
			return <Redirect push to={{ pathname: '/form' }} />;
	}

	return (
		<div>
			{/* <Bar></Bar> */}
			{/* <Typography variant="h4" align="center">JITHESHRAJ SCHOLARSHIP APPLICATION PORTAL 2019-2020</Typography> */}
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<form className={classes.form} noValidate>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							onChange={handleEmailInput}
							error={emailError}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							onChange={handlePasswordInput}
							error={passwordError}
						/>
						<Typography fullWidth variant="body1" center style={{ textAlign: 'center', color: 'red' }}>{errorDisplay}</Typography>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={handleSubmit}
						>
							Sign In
    					</Button>
						<Grid container>
							<Grid item xs>
								<Link component={RouterLink} to="#" variant="body2">
									Forgot password?
    							</Link>
							</Grid>
							<Grid item>
								<Link component={RouterLink} to="/signup" variant="body2">
									{'Don\'t have an account? Sign Up'}
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		</div>
	);
}