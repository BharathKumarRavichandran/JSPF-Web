import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import EmailIcon from '@material-ui/icons/Email';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import { sendVerificationCode, checkCode, forgotPassword, resetPassword } from '../utils/api/auth.helper';

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
	centeredContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
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
	center: {
		margin: '0 auto',
	},
	appBar: {
		padding: theme.spacing(2),
	},
}));

const validate = {
	verificationCode: (value) => !isEmpty(value),
	confirmPassword: (value, values) => !isEmpty(value) && values.password == value,
	password: value => (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&'()"+,-./:;<=>^_`|{}~])[A-Za-z\d@$!%*#?&'()"+,-./:;<=>^_`|{}~]{8,}$/).test(value)
};

const validationMessages = {
	verificationCode: 'Please enter the verification code',
	confirmPassword: 'Confirm password must be equal to password',
	password: 'Password must contain atleast 1 lowercase letter, 1 uppercase letter, 1 digit, 1 special character and be atleast 8 characters long',
};

export default function ForgotPassword(props) {
	const classes = useStyles();

	const [loading, setloading] = useState(false);
	const [email, setEmail] = useState();
	const [emailError, setEmailError] = useState(false);
	const [error, setError] = useState({
		verificationCode: false,
		confirmPassword: false,
		password: false,
	});
	const [values, setValues] = React.useState({
		verificationCode: '',
		password: '',
		confirmPassword: '',
	});
	const [emailSubmitted, setEmailSubmitted] = useState(false);
	const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);
	const [errorDisplay, setErrorDisplay] = useState();
    
	const handleEmailInput = (e) => setEmail(e.target.value);

	const handleChange = name => event => {
		setErrorDisplay(false);
		setValues({ ...values, [name]: event.target.value });
	};

	const checkCanResetPassword = async () => {
		let canReset = true;
		setErrorDisplay(false);
                
		for (const key in values) {
			if (values.hasOwnProperty(key)) {
				if (!validate[key](values[key], values)) {
					setError({ ...error, [key]: true });
					setErrorDisplay(validationMessages[key]);
					canReset = false;
				} else {
					setError({ ...error, [key]: false });
				}
			}
		}
		return canReset;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!emailSubmitted) {
			if (!email) {
				setEmailError(true);
				setErrorDisplay('Please enter email');
			}
			else if (!isEmail(email)) {
				setEmailError(true);
				setErrorDisplay('Invalid email');
			}
			else {
				setEmailError(false);
				setError(false);
				setloading(true);
				try {
					const response = await forgotPassword(email);
					setloading(false);
					if (response.status === 200) {
						setEmailSubmitted(true);
					} else if (response.status === 400) {
						setEmailError(true);
						setErrorDisplay(response.data.message);
					}
				} catch (error) {
					setloading(false);
					setEmailError(true);
					setErrorDisplay(`Something went wrong. Error : ${error}`);
				}
			}

		} else {
			setloading(true);
			if (await checkCanResetPassword()) {
				try {
					const res = await resetPassword({...values,email: email});
					setloading(false);
					if (res.status == 200) {
						setPasswordResetSuccess(true);
					} else {
						if (res.status == 400){
							console.log(res);
							setErrorDisplay(res.data.message);
						}
					}
				} catch (error) {
					setloading(false);
					setErrorDisplay(`Something went wrong. Error : ${error}`);
				}
			} else {
				setloading(false);
			}
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div>
				{
					(passwordResetSuccess) ? (
						<div className={classes.paper}>
							<Typography>Password has been reset successfully!</Typography>
							<Grid container>
								<Link className={classes.center} component={RouterLink} to="/login" variant="body2">
                                    Go to login page
								</Link>
							</Grid>
						</div>
					) : (
						<div className={classes.paper}>
							<Avatar className={classes.avatar}>
								<EmailIcon />
							</Avatar>
							<Typography component="h1" variant="h5">
                                    Forgot Password
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
									disabled={loading || emailSubmitted}
									onChange={handleEmailInput}
									error={emailError}
								/>
								{emailSubmitted ? (
									<Grid>
										<TextField
											variant="outlined"
											margin="normal"
											required
											fullWidth
											name="verificationCode"
											label="Verification Code"
											// type="number"
											disabled={loading}
											id="verification-code"
											onChange={handleChange('verificationCode')}
											error={error.verificationCode}
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
											onChange={handleChange('password')}
											autoComplete="current-password"
											error={error.password}
										/>
										<TextField
											variant="outlined"
											margin="normal"
											required
											fullWidth
											name="confirmPassword"
											label="Confirm Password"
											type="password"
											id="confirmPassword"
											onChange={handleChange('confirmPassword')}
											autoComplete="current-password"
											error={error.confirmPassword}
										/>
									</Grid>
								) : ''}
								<Typography fullWidth variant="body1" center style={{ textAlign: 'center', color: 'red' }}>{errorDisplay}</Typography>
								<div className={classes.centeredContainer}>
									{loading ? <CircularProgress></CircularProgress> : ''}
								</div>
								<Button
									type="submit"
									variant="contained"
									color="primary"
									fullWidth
									className={classes.submit}
									onClick={handleSubmit}
									disabled={loading}
								>
									<Typography variant="button">{emailSubmitted ? 'Reset Password' : 'Send Verification Code'}</Typography>
								</Button>
								<Grid container>
									<Link className={classes.center} component={RouterLink} to="/login" variant="body2">
                                            Jump to login page?
									</Link>
								</Grid>
							</form>
						</div>
					)
				}
			</div>
		</Container>
	);
}

ForgotPassword.propTypes = {

};