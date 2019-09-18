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
import { sendVerificationCode, checkCode } from '../utils/api/auth.helper';

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
export default function EmailVerify(props) {
	const classes = useStyles();
	const [email, setEmail] = useState();
	const [code, setCode] = useState();
	const [error, setError] = useState();
	const [loading, setloading] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [codeError, setCodeError] = useState(false);
	const [emailSubmitted, setEmailSubmitted] = useState(false);
	const handleEmailInput = (e) => setEmail(e.target.value);
	const handleCodeInput = (e) => setCode(e.target.value);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (emailSubmitted) {
			if (!code) {
				setCodeError(true);
				setError('Please enter verification code');
			}
			else {
				setCodeError(false);
				setError(false);
				setloading(true);
				try {
					const res = await checkCode(email, code,props.isInsti);
					setloading(false);
					if (res.status == 200) {
						if (!props.isInsti) {
							props.setEmailVerified(true);
							props.setVerificationCode(code);
							props.setEmail(email);
						}
						else{
							props.onVerifySuccess();
						}

					} else {
						setCodeError(true);
						if(res.status==400)
							setError(res.data.message);
					}

				} catch (error) {
					setloading(false);
					setCodeError(true);
					setError(`Something went wrong. Error : ${error}`);
				}
			}
		} else {
			if (!email) {
				setEmailError(true);
				setError('Please enter email');
			}
			else if (!isEmail(email)) {
				setEmailError(true);
				setError('Invalid email');
			}
			else {
				setEmailError(false);
				setError(false);
				setloading(true);
				try {
					const response = await sendVerificationCode(email,props.isInsti);
					setloading(false);
					if (response.status === 200) {
						setEmailSubmitted(true);
					} else if (response.status === 400) {
						setEmailError(true);
						setError(response.data.message);
					}
				} catch (error) {
					setloading(false);
					setEmailError(true);
					setError(`Something went wrong. Error : ${error}`);
				}

			}
		}
	};
	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<EmailIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					{props.isInsti ? 'Institute ' : ''}Email Verification
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
					<Typography variant="body1">{!(props.isInsti)?'All official notices from JSPF will be sent to this Email ID. Kindly register using an ID you frequently check. This will also be your userID for subsequent logins':'Please verify institute email to access the form'}</Typography>

					{emailSubmitted ? <TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="verification-code"
						label="Verification Code"
						// type="number"
						disabled={loading}
						id="verification-code"
						onChange={handleCodeInput}
						error={codeError}
					// error={passwordError}
					/> : ''}
					{/* <Box justifyContent> */}
					<Typography fullWidth variant="body1" center style={{ textAlign: 'center', color: 'red' }}>{error}</Typography>
					{/* </Box> */}
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
						<Typography variant="button">{emailSubmitted ? 'Verify' : 'Send Verification Code'}</Typography>
					</Button>
					<Grid container>
						{/* <Grid item xs>
							<Link component={RouterLink} href="#" variant="body2">
							Forgot password?
							</Link>
						</Grid> */}
						{/* <Grid item> */}
						{props.isInsti?'':<Link className={classes.center} component={RouterLink} to="/login" variant="body2">
							{'Registered already? Log in'}
						</Link>}
						{/* </Grid>*/}
					</Grid>
				</form>
			</div>
		</Container>

	);
}

EmailVerify.propTypes = {
	isInsti: PropTypes.bool.isRequired,
	setEmailVerified: PropTypes.bool.isRequired,
	setVerificationCode: PropTypes.bool.isRequired,
	setEmail: PropTypes.bool.isRequired,
	onVerifySuccess: PropTypes.func.isRequired
};