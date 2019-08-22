import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';

import { CircularProgress, Paper, Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

// Importing API utils
import { getAllPendingRequirements, updateSignature, getSignature, viewForm, submitForm } from '../../utils/api/review.helper';

const useStyles = makeStyles(theme => ({
	uppercase: {
		textTransform: 'uppercase'
	},
	lowercase: {
		textTransform: 'lowercase'
	},
	button: {
		margin: theme.spacing(1),
	},
	leftIcon: {
		marginRight: theme.spacing(1),
	},
	rightIcon: {
		marginLeft: theme.spacing(1),
	},
	paper: {
		// flexGrow: 1,
		padding: theme.spacing(3),
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200,
	},
	centeredContainer: {
		position: 'fixed',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	},
	heading: {
		textAlign: 'center',
		textTransform: 'uppercase'
	},
	subheading: {

	},
	subsection: {
		marginTop: theme.spacing(5),
		marginBottom: theme.spacing(5)
	},
	subsection2: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2)
	},
	red : {
		color: 'red',
	}
}));

export default function ReviewPage(props) {
	const classes = useStyles();

	const [isLoading1, setIsLoading1] = useState(true);
	const [isLoading2, setIsLoading2] = useState(true);
	
	const [requirements, setRequirements] = useState(null);
	const [signature, setSignature] = useState('');
	const [signatureError, setSignatureError] = useState(false);

	const getUnfilledRequirements = async () => {
		try{
			const serverResponse = await getAllPendingRequirements();
			if(serverResponse.data.status_code==200 && serverResponse.data.data){
				setRequirements(serverResponse.data.data);
				setIsLoading1(false);
			}
			else{
				if(serverResponse.data.message)
					toast.error(serverResponse.data.message);
				else
					toast.error(serverResponse.statusText);
			}
		} catch(error) {
			toast.error(error.toString());
		}
	};

	const getStudentSignature = async () => {
		try{
			const serverResponse = await getSignature();
			if(serverResponse.data.status_code==200 && serverResponse.data.data){
				setSignature(serverResponse.data.data.signature);
				setIsLoading2(false);
			}
			else{
				if(serverResponse.data.message)
					toast.error(serverResponse.data.message);
				else
					toast.error(serverResponse.statusText);
			}
		} catch(error) {
			toast.error(error.toString());
		}
	};

	const handleSignatureChange = async (e) => {
		setSignature(e.target.value);
		setSignatureError(false);
	};

	const handleSignatureSave = async () => {
		try {
			if(signature){
				const response = await updateSignature(signature);
				if(response.data.status_code==200){
					toast.success(response.data.message);
				}
				else{
					toast.error(response.data.message);
				}
			}
			else{
				setSignatureError(true);
			}
		} catch(error){
			toast.error(error.toString());
		}
	};

	const handleFormView = async () => {
		try {
			const response = await viewForm();
			// TODO: Add loading modal
			if(response.data.status_code==200){
				//response.data.data.applicationFilePath;
			}
			else{
				toast.error(response.data.message);
			}
		} catch (error) {
			toast.error(error.toString());
		}
	};	

	const handleFormSubmit = async () => {
		try {
			const response1 = await handleSignatureSave();

			// TODO: Add confirmation modal
			if(response1.data.status_code==200){
				const response2 = await submitForm();
				if(response2.data.status_code==200){
					// TODO: do something
				}
				else{
					toast.error(response2.data.message);
				}
			}
			else{
				toast.error(response1.data.message);
			}
		} catch (error) {
			toast.error(error.toString());
		}
	};

	useEffect( () => {
		async function fetchAPI() {
			try {
				await getUnfilledRequirements();
				await getStudentSignature();
			} catch(error) {
				toast.error(error.toString());
			}
		}
		fetchAPI();
	}, []);

	if (isLoading1 || isLoading2) {
		return <Box className={classes.centeredContainer}><CircularProgress size={80}/></Box>;
	} else {
		return (
			<Paper className={classes.paper}>
				<Typography variant="h3" className={classes.heading} gutterBottom>Review</Typography>
				<Box>
					<Typography variant="h6" className={classes.subheading} gutterBottom>Pending required fields
						<span className={classes.red}> *</span>
					</Typography>
					{
						requirements.necessaryRequirements.personalInfo[0] ?
							(
								<Box>
									<div>Personal Information</div>
									<ul>
										{requirements.necessaryRequirements.personalInfo.map((value, index) => (
											<li key={index}>{value}</li>
										))}
									</ul>
								</Box>
							) : ( null )
					}
					{
						requirements.necessaryRequirements.certificates[0] ?
							(
								<Box>
									<div>Certificates and Grade Sheets</div>
									<ul>
										{requirements.necessaryRequirements.certificates.map((value, index) => (
											<li key={index}>{value}</li>
										))}
									</ul>
								</Box>
							) : ( null )
					}
					{
						requirements.necessaryRequirements.abstract[0] ?
							(
								<Box>
									<div>Project Abstract</div>
									<ul>
										{requirements.necessaryRequirements.abstract.map((value, index) => (
											<li key={index}>{value}</li>
										))}
									</ul>
								</Box>
							) : ( null )
					}
					{
						requirements.necessaryRequirements.essays[0] ?
							(
								<Box>
									<div>Essays</div>
									<ul>
										{requirements.necessaryRequirements.essays.map((value, index) => (
											<li key={index}>{value}</li>
										))}
									</ul>
								</Box>
							) : ( null )
					}
				</Box>
				<Box>
					<Typography variant="h6" className={classes.subheading} gutterBottom>Optional unfilled fields</Typography>
					{
						requirements.optionalRequirements.personalInfo[0] ?
							(
								<Box>
									<div>Personal Information</div>
									<ul>
										{requirements.optionalRequirements.personalInfo.map((value, index) => (
											<li key={index}>{value}</li>
										))}
									</ul>
								</Box>
							) : ( null )
					}
					{
						requirements.optionalRequirements.certificates[0] ?
							(
								<Box>
									<div>Certificates and Grade Sheets</div>
									<ul>
										{requirements.optionalRequirements.certificates.map((value, index) => (
											<li key={index}>{value}</li>
										))}
									</ul>
								</Box>
							) : ( null )
					}
					{
						requirements.optionalRequirements.abstract[0] ?
							(
								<Box>
									<div>Project Abstract</div>
									<ul>
										{requirements.optionalRequirements.abstract.map((value, index) => (
											<li key={index}>{value}</li>
										))}
									</ul>
								</Box>
							) : ( null )
					}
					{
						requirements.optionalRequirements.essays[0] ?
							(
								<Box>
									<div>Essays</div>
									<ul>
										{requirements.optionalRequirements.essays.map((value, index) => (
											<li key={index}>{value}</li>
										))}
									</ul>
								</Box>
							) : ( null )
					}
				</Box>
				<Box>
					<div>
						<div>Declaration of Confirmation<span className={classes.red}> *</span></div>
						<div>
							I hereby declare that all documents and information provided are original and authentic. If I am found guilty of plagiarism or malpractice, I have no objection in my application being terminated.
						</div>
					</div>
					<FormControl>
						<TextField
							id="signature"
							label="Signature"
							value={signature}
							className={classes.textField}
							margin="normal"
							onChange={handleSignatureChange}
							error={signatureError}
						/>
						<span>
							(Enter your full name as mentioned in data of birth certificate instead of your signature)
						</span>
					</FormControl>
				</Box>
				<Box>
					<Button
						variant="contained"
						color="secondary"
						className={classes.button}
						onClick={handleSignatureSave}
					>
						Save
					</Button>
					<Button
						variant="contained"
						color="primary" 
						className={classes.button}
						onClick={handleFormSubmit}
					>
						Submit
					</Button>
				</Box>
			</Paper>
		);
	}
}