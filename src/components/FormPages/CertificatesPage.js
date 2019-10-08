import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';

// Importing Material components
import { CircularProgress, Paper, Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// Importing API utils
import { uploadGradeSheetSem1, uploadInstiCertificate, uploadNonInstiCertificate, uploadGradeSheetMOOC, viewAllCertificates } from '../../utils/api/certificates.helper';

const useStyles = makeStyles(theme => ({
	button: {
		margin: theme.spacing(1),
	},
	paper: {
		// flexGrow: 1,
		padding: theme.spacing(3),
		width: 'inherit'
	},
	centeredContainer: {
		position: 'fixed',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	},
	heading: {
		textAlign: 'center',
		textTransform: 'uppercase',
		fontWeight: '300'
	},
	subheading: {

	},
	subsection: {
		marginTop: theme.spacing(5),
		marginBottom: theme.spacing(5)
	},
	red : {
		color: 'red',
	}
}));

export default function CertificatesPage(props) {
	const classes = useStyles();

	const [isLoading, setIsLoading] = useState(true);

	const [gradeSheetSem1, setGradeSheetSem1] = useState(false);
	const [gradeSheetSem1Preview, setGradeSheetSem1Preview] = useState(null);
	const [gradeSheetSem1Location, setGradeSheetSem1Location] = useState(null);
	const [instiCertificate, setInstiCertificate] = useState(false);
	const [instiCertificatePreview, setInstiCertificatePreview] = useState(null);
	const [instiCertificateLocation, setInstiCertificateLocation] = useState(null);
	const [nonInstiCertificate, setNonInstiCertificate] = useState(false);
	const [nonInstiCertificatePreview, setNonInstiCertificatePreview] = useState(null);
	const [nonInstiCertificateLocation, setNonInstiCertificateLocation] = useState(null);
	const [gradeSheetMOOC, setGradeSheetMOOC] = useState(false);
	const [gradeSheetMOOCPreview, setGradeSheetMOOCPreview] = useState(null);
	const [gradeSheetMOOCLocation, setGradeSheetMOOCLocation] = useState(null);

	const getAllCertificates = async () => {
		try {
			const serverResponse = await viewAllCertificates();
			if(serverResponse.data.status_code==200){
				const certificates = serverResponse.data.data.certificates;
				if(certificates.gradeSheetSem1){
					setGradeSheetSem1(true);
					setGradeSheetSem1Location(certificates.gradeSheetSem1);
				}
				if(certificates.instiCertificate){
					setInstiCertificate(true);
					setInstiCertificateLocation(certificates.instiCertificate);
				}
				if(certificates.nonInstiCertificate){
					setNonInstiCertificate(true);
					setNonInstiCertificateLocation(certificates.nonInstiCertificate);
				}
				if(certificates.gradeSheetMOOC){
					setGradeSheetMOOC(true);
					setGradeSheetMOOCLocation(certificates.gradeSheetMOOC);
				}
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

	const validateFile = async (file) => {
		const allowedFileTypesRE = /jpeg|jpg|png/;
		// File size limit: 1 MB
		if(file.size > 1000000){
			toast.error('File size should be less than 1MB.');
			return false;
		}
		else if(!allowedFileTypesRE.test(file.type)){
			toast.error('File type should be in jpg, jpeg or png format.');
			return false;
		}
		return true;
	};

	const handleFileChange = async (e, field) => {
		switch(field) {
			case 'gradeSheetSem1':
				if(!gradeSheetSem1){
					if(await validateFile(e.target.files[0])){
						setGradeSheetSem1Location(e.target.files[0]);
						setGradeSheetSem1Preview(URL.createObjectURL(e.target.files[0]));
					} else {
						setGradeSheetSem1Location(null);
						setGradeSheetSem1Preview(null);
					}
				}
				else{
					toast.error('File already uploaded.');
				}
				break;

			case 'instiCertificate':
				if(!instiCertificate){
					if(await validateFile(e.target.files[0])){
						setInstiCertificateLocation(e.target.files[0]);
						setInstiCertificatePreview(URL.createObjectURL(e.target.files[0]));
					} else {
						setInstiCertificateLocation(null);
						setInstiCertificatePreview(null);
					}
				}
				else{
					toast.error('File already uploaded.');
				}
				break;

			case 'nonInstiCertificate':
				if(!nonInstiCertificate){
					if(await validateFile(e.target.files[0])){
						setNonInstiCertificateLocation(e.target.files[0]);
						setNonInstiCertificatePreview(URL.createObjectURL(e.target.files[0]));
					} else {
						setNonInstiCertificateLocation(null);
						setNonInstiCertificatePreview(null);
					}
				}
				else{
					toast.error('File already uploaded.');
				}
				break;

			case 'gradeSheetMOOC':
				if(!gradeSheetMOOC){
					if(await validateFile(e.target.files[0])){
						setGradeSheetMOOCLocation(e.target.files[0]);
						setGradeSheetMOOCPreview(URL.createObjectURL(e.target.files[0]));
					} else {
						setGradeSheetMOOCLocation(null);
						setGradeSheetMOOCPreview(null);
					}
				}
				else{
					toast.error('File already uploaded.');
				}
				break;
		}
	};

	const handleFileUpload = async (field) => {
		switch(field) {
			case 'gradeSheetSem1':
				if(!gradeSheetSem1){
					if(gradeSheetSem1Location){
						const uploadResponse = await uploadGradeSheetSem1(gradeSheetSem1Location);
						if(uploadResponse.data.status_code==200){
							setGradeSheetSem1(true);
							setGradeSheetSem1Location(uploadResponse.data.data.filePath);
							toast.success(uploadResponse.data.message);
						}
						else{
							toast.error(uploadResponse.data.message);
						}
					}
					else{
						toast.error('Improper file format!');
					}
				}
				else {
					toast.error('File already uploaded.');
				}
				break;

			case 'instiCertificate':
				if(!instiCertificate){
					if(instiCertificateLocation){
						const uploadResponse = await uploadInstiCertificate(instiCertificateLocation);
						if(uploadResponse.data.status_code==200){
							setInstiCertificate(true);
							setInstiCertificateLocation(uploadResponse.data.data.filePath);
							toast.success(uploadResponse.data.message);
						}
						else {
							toast.error(uploadResponse.data.message);
						}
					}
					else {
						toast.error('Improper file format!');
					}
				}
				else {
					toast.error('File already uploaded.');
				}
				break;

			case 'nonInstiCertificate':
				if(!nonInstiCertificate){
					if(nonInstiCertificateLocation){
						const uploadResponse = await uploadNonInstiCertificate(nonInstiCertificateLocation);
						if(uploadResponse.data.status_code==200){
							setNonInstiCertificate(true);
							setNonInstiCertificateLocation(uploadResponse.data.data.filePath);
							toast.success(uploadResponse.data.message);
						}
						else {
							toast.error(uploadResponse.data.message);
						}
					}
					else {
						toast.error('Improper file format!');
					}
				}
				else {
					toast.error('File already uploaded.');
				}
				break;
				
			case 'gradeSheetMOOC':
				if(!gradeSheetMOOC){
					if(gradeSheetMOOCLocation){
						const uploadResponse = await uploadGradeSheetMOOC(gradeSheetMOOCLocation);
						if(uploadResponse.data.status_code==200){
							setGradeSheetMOOC(true);
							setGradeSheetMOOCLocation(uploadResponse.data.data.filePath);
							toast.success(uploadResponse.data.message);
						}
						else{
							toast.error(uploadResponse.data.message);
						}
					}
					else{
						toast.error('Improper file format!');
					}
				}
				else {
					toast.error('File already uploaded.');
				}
				break;
		}
	};

	useEffect( () => {
		async function fetchAPI() {
			try {
				await getAllCertificates();
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
				<Typography variant="h3" className={classes.heading} gutterBottom>Certificates and Grade Sheets</Typography>
				
				<Box className={classes.subsection}>
					<Typography variant="h6" className={classes.subheading}>
						Scanned copy of the original Semester 1 grade sheet 
						<span className={classes.red}> *</span>
					</Typography>
					<ul>
						<li>Screenshot of MIS will NOT be accepted.</li>
						<li>Please contact your class representative or the Academic Office (Admin building, 1st floor) to receive your original Grade sheet, in case it is not provided after the announcement of Semester 1 results.</li>
					</ul>
					{ 
						!gradeSheetSem1 ? 
							(
								<Box>
									<Button variant="contained" component="label" className={classes.button}>
										Choose File
										<input
											type="file"
											onChange={ (e) => { handleFileChange(e,'gradeSheetSem1'); } }
											style={{ display: 'none' }}
										/>
									</Button>
									<Button variant="contained" color="secondary" className={classes.button}
										target='_blank'
										href={gradeSheetSem1Preview}
									>
										Preview
									</Button>
									<Button
										variant="contained"
										color="primary"
										className={classes.button}
										onClick={ () => handleFileUpload('gradeSheetSem1') }
									>
										Upload
									</Button>
								</Box>
							)
							:
							(
								<Box>
									<Button
										variant="contained"
										color="primary"
										className={classes.button}
										target='_blank'
										href={gradeSheetSem1Location}
									>
										View File
									</Button>
								</Box>
							)
					}
				</Box>
				<Box className={classes.subsection}>
					<Typography variant="h6" className={classes.subheading}>
						Scanned copy of your Certificate of Participation or Merit of the contest conducted by affiliates of NIT Trichy 
						<span className={classes.red}> *</span>
					</Typography>
					<ul>
						<li>Scanned copy of the Participation or Merit certificate of the contest is to be submitted.</li>
						<li>Both certificates pertaining to an NIT Trichy and a Non-NIT Trichy contest are mandatory.</li>
						<li>We recommend choosing a contest that challenges you or is inclined to your interests.</li>
					</ul>
					{ 
						!instiCertificate ?
							(
								<Box>
									<Button variant="contained" component="label" className={classes.button}>
										Choose File
										<input
											type="file"
											onChange={ (e) => { handleFileChange(e,'instiCertificate'); } }
											style={{ display: 'none' }}
										/>
									</Button>
									<Button variant="contained" color="secondary" className={classes.button}
										target='_blank'
										href={instiCertificatePreview}
									>
										Preview
									</Button>
									<Button
										variant="contained"
										color="primary"
										className={classes.button}
										onClick={ () => handleFileUpload('instiCertificate') }
									>
										Upload
									</Button>
								</Box>
							)
							:
							(
								<Box>
									<Button
										variant='contained'
										color='primary'
										className={classes.button}
										target='_blank'
										href={instiCertificateLocation}
									>
										View File
									</Button>
								</Box>
							)
					}
				</Box>
				<Box className={classes.subsection}>
					<Typography variant="h6" className={classes.subheading}>
						Scanned copy of your Certificate of Participation or Merit of the contest conducted by institutes other than NIT Trichy 
						<span className={classes.red}> *</span>
					</Typography>
					{
						!nonInstiCertificate ?
							(
								<Box>
									<Button variant="contained" component="label" className={classes.button}>
										Choose File
										<input
											type="file"
											onChange={ (e) => { handleFileChange(e,'nonInstiCertificate'); } }
											style={{ display: 'none' }}
										/>
									</Button>
									<Button variant="contained" color="secondary" className={classes.button}
										target='_blank'
										href={nonInstiCertificatePreview}
									>
										Preview
									</Button>
									<Button
										variant="contained"
										color="primary"
										className={classes.button}
										onClick={ () => handleFileUpload('nonInstiCertificate') }
									>
										Upload
									</Button>
								</Box>
							)
							:
							(
								<Box>
									<Button
										variant='contained'
										color='primary'
										className={classes.button}
										target='_blank'
										href={nonInstiCertificateLocation}
									>
										View File
									</Button>
								</Box>
							)
					}
				</Box>
				<Box className={classes.subsection}>
					<Typography variant="h6" className={classes.subheading}>
						Screenshot or Original grade sheet of the completed MOOC 
						<span className={classes.red}> *</span>
					</Typography>
					{
						!gradeSheetMOOC ?
							(
								<Box>
									<Button variant="contained" component="label" className={classes.button}>
									Choose File
										<input
											type='file'
											onChange={ (e) => { handleFileChange(e,'gradeSheetMOOC'); } }
											style={{ display: 'none' }}
										/>
									</Button>
									<Button variant="contained" color="secondary" className={classes.button}
										target='_blank'
										href={gradeSheetMOOCPreview}
									>
									Preview
									</Button>
									<Button
										variant="contained"
										color="primary"
										className={classes.button}
										onClick={ () => handleFileUpload('gradeSheetMOOC') }
									>
									Upload
									</Button>
								</Box>
							)
							:
							(
								<Box>
									<Button
										variant='contained'
										color='primary'
										className={classes.button}
										target='_blank'
										href={gradeSheetMOOCLocation}
									>
										View File
									</Button>
								</Box>
							)
					}
				</Box>
			</Paper>
		);
	}
}