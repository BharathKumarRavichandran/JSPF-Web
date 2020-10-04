import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { registerStudent } from '../utils/api/auth.helper';
import isIn from 'validator/lib/isIn';
import isInt from 'validator/lib/isInt';
import isMobilePhone from 'validator/lib/isMobilePhone';
import isEmpty from 'validator/lib/isEmpty';
import { withRouter } from 'react-router-dom';

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
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const departmentList = [
	'Architecture',
	'Chemical Engineering',
	'Civil Engineering',
	'Computer Science Engineering',
	'Electrical and Electronics Engineering',
	'Electronics and Communication Engineering',
	'Instrumentation and Control Engineering',
	'Mechanical Engineering',
	'Metallurgical and Materials Engineering',
	'Production Engineering'
];

const tshirtSizeList = ['S', 'M', 'L', 'XL', 'XXL'];

const validate = {
	department: value => isIn(value, departmentList),
	name: value => { return !isEmpty(value); },
	rollNumber: value => isInt(value),
	tshirtSize: value => isIn(value, tshirtSizeList),
	contactNumberCall: value => isMobilePhone(value),
	contactNumberWhatsapp: value => isMobilePhone(value),
	confirmPassword: (value, values) => !isEmpty(value) && values.password == value,
	password: value => (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&'()"+,-./:;<=>^_`|{}~])[A-Za-z\d@$!%*#?&'()"+,-./:;<=>^_`|{}~]{8,}$/).test(value),
};

const validationMessages = {
	department: 'Please select valid department',
	name: 'Invalid name',
	rollNumber: 'Roll number should be numeric',
	tshirtSize: 'Please select a valid size',
	contactNumberCall: 'Invalid Mobile number',
	contactNumberWhatsapp: 'Invalid Mobile number',
	confirmPassword: 'Confirm password must be equal to password',
	password: 'Password must contain atleast 1 lowercase letter, 1 uppercase letter, 1 digit, 1 special character and be atleast 8 characters long',
};

const SignUpForm = (props) => {
	const classes = useStyles();
	const [canSubmit, setCanSubmit] = React.useState(false);
	const [values, setValues] = React.useState({
		department: '',
		name: '',
		rollNumber: '',
		tshirtSize: '',
		contactNumberCall: '',
		contactNumberWhatsapp: '',
		confirmPassword: '',
		password: '',
	});
	const [error, setError] = React.useState({
		department: false,
		name: false,
		rollNumber: false,
		tshirtSize: false,
		contactNumberCall: false,
		contactNumberWhatsapp: false,
		confirmPassword: false,
		password: false,
	});
	const [errorDisplay, setErrorDisplay] = React.useState();

	const handleChange = name => event => {
		setValues({ ...values, [name]: event.target.value });
	};

	React.useEffect(() => {
		setCanSubmit(true);
		setErrorDisplay(false);
		for (const key in values) {
			if (values.hasOwnProperty(key)) {
				if (!validate[key](values[key], values)) {
					setError({ ...error, [key]: true });
					setErrorDisplay(validationMessages[key]);
					setCanSubmit(false);
				} else {
					setError({ ...error, [key]: false });
				}
				// if (error[key]){
				// }
			}
		}
	}, [values]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (canSubmit) {
			try {
				const res = await registerStudent({...values,email:props.email,verificationCode:props.verificationCode});
				if (res.status === 400) {
					setErrorDisplay(res.data.message);
				} else if (res.status == 200) {
					props.history.push('/');
				}
			} catch (error) {
				setErrorDisplay(`Something went wrong. Error : ${error}`);
			}
		}
	};


	return (
		<Container component="main" maxWidth="sm">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="fname"
								name="name"
								variant="outlined"
								required
								fullWidth
								id="firstName"
								label="Name"
								autoFocus
								error={error.name}
								onChange={handleChange('name')}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								type="number"
								id="rollNumber"
								label="Roll Number"
								name="rollNumber"
								error={error.rollNumber}
								onChange={handleChange('rollNumber')}
							// autoComplete="lname"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel htmlFor="dept-select">Department</InputLabel>
							<Select
								fullWidth
								value={values.department}
								error={error.department}
								onChange={handleChange('department')}
								inputProps={{
									name: 'department',
									id: 'dept-select',
								}}
							>
								<MenuItem value="" disabled>Select Department</MenuItem>
								{departmentList.map((item, index) => {
									return <MenuItem value={item} key={index} >{item}</MenuItem>;
								})}
							</Select>
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputLabel htmlFor="tshirtSize-select">T-shirt size</InputLabel>
							<Select
								fullWidth
								error={error.tshirtSize}
								value={values.tshirtSize}
								onChange={handleChange('tshirtSize')}
								inputProps={{
									name: 'tshirtSize',
									id: 'tshirtSize-select',
								}}
							>
								<MenuItem value="" disabled>Select Size</MenuItem>
								{tshirtSizeList.map((item, index) => {
									return <MenuItem value={item} key={index} >{item}</MenuItem>;
								})}
							</Select>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="tel"
								name="contactNumberCall"
								variant="outlined"
								required
								error={error.contactNumberCall}
								fullWidth
								id="contactNumberCall"
								label="Contact Number to reach by call"
								type="number"
								onChange={handleChange('contactNumberCall')}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="tel"
								name="contactNumberWhatsapp"
								error={error.contactNumberWhatsapp}
								variant="outlined"
								required
								fullWidth
								id="contactNumberWhatsapp"
								label="Contact Number : WhatsApp"
								type="number"
								onChange={handleChange('contactNumberWhatsapp')}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								error={error.password}
								id="password"
								onChange={handleChange('password')}
								autoComplete="current-password"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="confirmPassword"
								label="Confirm Password"
								type="password"
								id="confirmPassword"
								error={error.confirmPassword}
								onChange={handleChange('confirmPassword')}
								autoComplete="current-password"
							/>
						</Grid>
						<Typography fullWidth variant="body1" center style={{ textAlign: 'center', color: 'red' }}>{errorDisplay}</Typography>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={handleSubmit}
							disabled={!canSubmit}
						>
							Sign Up
						</Button>
						<Grid container justify="flex-end">
							<Grid item>
								<Link href="/login" variant="body2">
									Already registered? Sign in
								</Link>
							</Grid>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
};

export default withRouter(SignUpForm);

SignUpForm.propTypes = {
	email: PropTypes.string,
	verificationCode: PropTypes.string
};