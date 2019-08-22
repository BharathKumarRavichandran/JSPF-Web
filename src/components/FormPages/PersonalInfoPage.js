import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';

import { CircularProgress, Paper, Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

// Importing API utils
import { updateInfo, getInfo } from '../../utils/api/personalInfo.helper';

const useStyles = makeStyles(theme => ({
	paper: {
		// flexGrow: 1,
		padding: theme.spacing(3),
	},
	centeredContainer: {
		position: 'fixed',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	},
	heading: {
		textAlign: 'center'
	}
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
				setGender(personalInfo.gender);
				setDisabilityStatus(personalInfo.disability.status);
				setDisabilityDescription(personalInfo.disability.description);
				setNationality(personalInfo.nationality);
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

	const updatePersonalInfo = async () => {
		try{
			const disability = {
				status: disabilityStatus,
				description: disabilityDescription
			};
			
			const serverResponse = await updateInfo(
				introduction,
				gender,
				disability,
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
			</Paper>
		);
	}
}