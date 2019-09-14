import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';

import { Button, CircularProgress, Paper, Box, MenuItem, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

// Importing utils
import nationalities from '../../utils/nationalities.json';

// Importing API utils
import { updateInfo, getInfo } from '../../utils/api/personalInfo.helper';

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
	paper: {
		// flexGrow: 1,
		padding: theme.spacing(3),
	},
	red : {
		color: 'red',
	},
	centeredContainer: {
		position: 'fixed',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	},
	heading: {
		textAlign: 'center'
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
	menu: {
		width: 200,
	},
}));

export default function PersonalInfoPage(props) {
	const classes = useStyles();

	const [isLoading, setIsLoading] = useState(true);

	const [introductionError, setIntroductionError] = useState(false);
	const [genderError, setGenderError] = useState(false);
	const [disabilityStatusError, setDisabilityStatusError] = useState(false);
	const [disabilityDescriptionError, setDisabilityDescriptionError] = useState(false);
	const [nationalityError, setNationalityError] = useState(false);
	const [firstGenStudentError, setFirstGenStudentError] = useState(false);
	const [refugeeError, setRefugeeError] = useState(false);
	const [pronounError, setPronounError] = useState(false);

	const [introduction, setIntroduction] = useState('');
	const [gender, setGender] = useState('');
	const [genderOtherValue, setGenderOtherValue] = useState('');
	const [disabilityStatus, setDisabilityStatus] = useState('');
	const [disabilityDescription, setDisabilityDescription] = useState('');
	const [nationality, setNationality] = useState('');
	const [firstGenStudent, setFirstGenStudent] = useState('');
	const [refugee, setRefugee] = useState('');
	const [pronoun, setPronoun] = useState('');

	const getPersonalInfo = async () => {
		try{
			const serverResponse = await getInfo();
			if(serverResponse.data.status_code==200 && serverResponse.data.data){
				const personalInfo = serverResponse.data.data.personalInfo;

				setIntroduction(personalInfo.introduction);
				if(personalInfo.gender!='Male' && personalInfo.gender!='Female' && personalInfo.gender!='Do not wish to disclose'){
					setGender('Other');
					setGenderOtherValue(personalInfo.gender);
				} else{
					setGender(personalInfo.gender);
				}
				setDisabilityStatus(personalInfo.disability.status);
				setDisabilityDescription(personalInfo.disability.description);
				if(personalInfo.nationality)
					setNationality(personalInfo.nationality);
				else
					setNationality('Indian');
				setFirstGenStudent(personalInfo.firstGenStudent);
				setRefugee(personalInfo.refugee);
				setPronoun(personalInfo.pronoun);

				setIsLoading(false);
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

	const handleInputChange = async (e, field) => {
		switch(field){
			case 'introduction':
				setIntroduction(e.target.value);
				break;
			case 'gender':
				setGender(e.target.value);
				break;
			case 'genderOtherValue':
				setGenderOtherValue(e.target.value);
				break;
			case 'disabilityStatus':
				setDisabilityStatus(e.target.value);
				if(disabilityStatus=='No') {
					setDisabilityDescription('');
				}
				break;
			case 'disabilityDescription':
				setDisabilityDescription(e.target.value);
				setDisabilityDescriptionError(false);
				break;
			case 'nationality':
				setNationality(e.target.value);
				break;
			case 'firstGenStudent':
				setFirstGenStudent(e.target.value);
				break;
			case 'refugee':
				setRefugee(e.target.value);
				break;
			case 'pronoun':
				setPronoun(e.target.value);
				break;
		}
	};

	const updatePersonalInfo = async () => {
		try{

			const genderValue = gender=='Other' ? genderOtherValue : gender;

			if(disabilityStatus=='Yes' && !disabilityDescription){
				setDisabilityDescriptionError(true);
			} else {			
				const serverResponse = await updateInfo(
					introduction,
					genderValue,
					disabilityStatus,
					disabilityDescription,
					nationality,
					firstGenStudent,
					refugee,
					pronoun
				);
				if(serverResponse.data.status_code==200){
					toast.success(serverResponse.data.message);
				}
				else{
					if(serverResponse.data.message)
						toast.error(serverResponse.data.message);
					else
						toast.error(serverResponse.statusText);
				}
			}
		} catch(error) {
			toast.error(error.toString());
		}
	};

	useEffect( () => {
		async function fetchAPI() {
			try {
				await getPersonalInfo();
			} catch(error) {
				toast.error(error.toString());
			}
		}
		fetchAPI();
	}, []);

	if (isLoading) {
		return <Box className={classes.centeredContainer}><CircularProgress size={80}/></Box>;
	} else {
		return (
			<Paper className={classes.paper}>
				<Typography variant="h3" className={classes.heading} gutterBottom>Personal Information</Typography>
				<Box>	
					<TextField
						id="introduction"
						label="Introduction"
						multiline
						rowsMax="10"
						value={introduction}
						error={introductionError}
						onChange={ (e) => { handleInputChange(e,'introduction'); } }
						className={classes.textField}
						helperText='1000 character introduction paragraph of you (A short paragraph to introduce yourself to the panellists. There are no
							restrictions other than the character limit.)'
						margin="normal"
					/>
				</Box>
				<Box>
					<TextField
						id="gender"
						select
						label="Gender"
						className={classes.textField}
						value={gender}
						error={genderError}
						onChange={ (e) => { handleInputChange(e,'gender'); } }
						SelectProps={{
							MenuProps: {
								className: classes.menu,
							},
						}}
						helperText="How would you like to identify yourself?"
						margin="normal"
					>
						<MenuItem key='Male' value='Male'>
							Male
						</MenuItem>
						<MenuItem key='Female' value='Female'>
							Female
						</MenuItem>
						<MenuItem key='Other' value='Other'>
							Other
						</MenuItem>
						<MenuItem key='Do not wish to disclose' value='Do not wish to disclose'>
							Do not wish to disclose
						</MenuItem>
					</TextField>
					{
						gender=='Other' ? 
							(
								<TextField
									id="genderOther"
									label="Specify"
									className={classes.textField}
									value={genderOtherValue}
									onChange={ (e) => { handleInputChange(e,'genderOtherValue'); } }
									margin="normal"
								/>
							):(null)
					}
				</Box>
				<Box>
					<TextField
						id="disability"
						select
						label="Disability"
						className={classes.textField}
						value={disabilityStatus}
						error={disabilityStatusError}
						onChange={ (e) => { handleInputChange(e,'disabilityStatus'); } }
						SelectProps={{
							MenuProps: {
								className: classes.menu,
							},
						}}
						helperText="Do you have any disability?"
						margin="normal"
					>
						<MenuItem key='Yes' value='Yes'>
							Yes
						</MenuItem>
						<MenuItem key='No' value='No'>
							No
						</MenuItem>
					</TextField>
					{
						disabilityStatus=='Yes' ? 
							(
								<TextField
									id="disabilityDescription"
									label="Description"
									multiline
									rowsMax="10"
									value={disabilityDescription}
									error={disabilityDescriptionError}
									onChange={ (e) => { handleInputChange(e,'disabilityDescription'); } }
									className={classes.textField}
									helperText='Please describe your disability within 100 characters'
									margin="normal"
								/>
							):(null)
					}
				</Box>
				<Box>
					<TextField
						id="nationality"
						select
						label="Nationality"
						className={classes.textField}
						value={nationality}
						error={nationalityError}
						onChange={ (e) => { handleInputChange(e,'nationality'); } }
						SelectProps={{
							MenuProps: {
								className: classes.menu,
							},
						}}
						helperText="What is your nationality?"
						margin="normal"
					>
						{
							nationalities.map(country => (
								<MenuItem key={country} value={country}>
									{country}
								</MenuItem>
							))
						}
					</TextField>
				</Box>
				<Box>
					<TextField
						id="firstGenStudent"
						select
						label="First Generation Student"
						className={classes.textField}
						value={firstGenStudent}
						error={firstGenStudentError}
						onChange={ (e) => { handleInputChange(e,'firstGenStudent'); } }
						SelectProps={{
							MenuProps: {
								className: classes.menu,
							},
						}}
						helperText="Are you a first generation college student from your family?"
						margin="normal"
					>
						<MenuItem key='Yes' value='Yes'>
							Yes
						</MenuItem>
						<MenuItem key='No' value='No'>
							No
						</MenuItem>
					</TextField>
				</Box>
				<Box>
					<TextField
						id="refugee"
						select
						label="Refugee"
						className={classes.textField}
						defaultValue='Not applicable'
						value={refugee}
						error={refugeeError}
						onChange={ (e) => { handleInputChange(e,'refugee'); } }
						SelectProps={{
							MenuProps: {
								className: classes.menu,
							},
						}}
						helperText="Have you been a refugee?"
						margin="normal"
					>
						<MenuItem key='Yes' value='Yes'>
							Yes
						</MenuItem>
						<MenuItem key='Not applicable' value='Not applicable'>
							Not applicable
						</MenuItem>
					</TextField>
				</Box>
				<Box>
					<TextField
						id="pronoun"
						select
						label="Preferred Pronoun"
						className={classes.textField}
						value={pronoun}
						error={pronounError}
						onChange={ (e) => { handleInputChange(e,'pronoun'); } }
						SelectProps={{
							MenuProps: {
								className: classes.menu,
							},
						}}
						helperText="What is your preferred pronoun?"
						margin="normal"
					>
						<MenuItem key='He/him/his' value='He/him/his'>
							He/him/his
						</MenuItem>
						<MenuItem key='She/her/hers' value='She/her/hers'>
							She/her/hers
						</MenuItem>
						<MenuItem key='They/them/their/theirs' value='They/them/their/theirs'>
							They/them/their/theirs
						</MenuItem>
					</TextField>
				</Box>
				<Box>
					<Button
						variant="contained"
						color="primary"
						className={classes.button}
						onClick={updatePersonalInfo}
					>
						Save
					</Button>
				</Box>
			</Paper>
		);
	}
}