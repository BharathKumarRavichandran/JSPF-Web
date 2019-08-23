import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';

import { CircularProgress, Paper, Box, Link} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';

import LinkIcon from '@material-ui/icons/Link';
import SendIcon from '@material-ui/icons/Send';

// Importing API utils
import { sendDocLink, uploadFinalAbstract, uploadSupportingFiles, viewAllAbstract } from '../../utils/api/abstract.helper';

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

export default function AbstractPage(props) {
	const classes = useStyles();

	const [isLoading, setIsLoading] = useState(true);

	const [docLinkError, setDocLinkError] = useState(false);
	const [docLink, setDocLink] = useState(null);
	const [docLinkURL, setDocLinkURL] = useState(null);
	const [abstract, setAbstract] = useState(null);
	const [abstractLocation, setAbstractLocation] = useState(null);
	const [supportingFiles, setSupportingFiles] = useState(null);
	const [supportingFilesLocation, setSupportingFilesLocation] = useState([null, null]);

	const getAllAbstract = async () => {
		try{
			const serverResponse = await viewAllAbstract();
			if(serverResponse.data.status_code==200 && serverResponse.data.data){
				const responseAbstract = serverResponse.data.data.abstract;
				if(responseAbstract.docLink){
					setDocLink(true);
					setDocLinkURL(responseAbstract.docLink);
				}
				if(responseAbstract.projectAbstract){
					setAbstract(true);
					setAbstractLocation(responseAbstract.projectAbstract);
				}
				if(responseAbstract.supportingFiles[0]){
					setSupportingFiles(true);
					setSupportingFilesLocation([ responseAbstract.supportingFiles[0], responseAbstract.supportingFiles[1] ]);
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

	const handleDocLinkChange = async (e) => {
		if(!docLink){
			setDocLinkURL(e.target.value);
			setDocLinkError(false);
		}
		else{
			toast.error('Cannot change link, already sent document link to mentors.');
		}
	};

	const handleSendDocLink = async () => {
		if(!docLink){
			if(docLinkURL){
				const response = await sendDocLink(docLinkURL);
				if(response.data.status_code==200){
					setDocLink(true);
					toast.success(response.data.message);
				}
				else{
					toast.error(response.data.message);
				}
			}
			else {
				setDocLinkError(true);
			}
		}
		else{
			toast.error('Cannot change link, already sent document link to mentors.');
		}
	};

	const handleAbstractChange = async (e) => {
		if(!abstract){
			setAbstractLocation(e.target.files[0]);
		}
		else{
			toast.error('File already uploaded.');
		}
	};

	const handleAbstractUpload = async () => {
		if(!abstract){
			if(abstractLocation){
				const uploadResponse = await uploadFinalAbstract(abstractLocation);
				if(uploadResponse.data.status_code==200){
					setAbstract(true);
					setAbstractLocation(uploadResponse.data.data.filePath);
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
	};

	const handleSupportingFilesChange = async (e) => {
		if(!supportingFiles){
			setSupportingFilesLocation([e.target.files[0], e.target.files[1]]);
		}
		else{
			toast.error('File already uploaded.');
		}
	};

	const handleSupportingFilesUpload = async () => {
		if(!supportingFiles){
			if(supportingFilesLocation){
				const uploadResponse = await uploadSupportingFiles(supportingFilesLocation[0], supportingFilesLocation[1]);
				if(uploadResponse.data.status_code==200){
					setSupportingFiles(true);
					setSupportingFilesLocation(uploadResponse.data.data.filesPath);
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
			toast.error('File(s) already uploaded.');
		}
	};

	useEffect( () => {
		async function fetchAPI() {
			try {
				await getAllAbstract();
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
				<Typography variant="h3" className={classes.heading} gutterBottom>Project Abstract</Typography>
				
				<Box className={classes.subsection}>
					<Typography variant="h6" className={classes.subheading}>
						One page Abstract of your technical/interdisciplinary project 
						<span className={classes.red}> *</span>
					</Typography>
					<ul>
						<li>
							Abstract must be submitted as PDFs.
						</li>
						<li>
							The text should be typed with "Normal" margin (2.54 cm on all four sides), font Calibri and font size 12. All of these options are available on Microsoft Word and other common word processor tools.
						</li>
						<li>
							Technical project is independent of your work for the contests you participate to satisfy criteria of participating in contests inside and outside NIT Trichy. Thus, the project you develop to participate in those contests cannot be used to satisfy this criterion.
						</li>
						<li>
							You may attach UPTO two supporting images along with the abstract. This is optional.
						</li>
						<li>
							You will be allowed to upload the final version of the document(s) ONLY from state start date: 30 days before final deadline.
						</li>
						<li>
							You may view this link to webinar on<span> </span>
							<Link>
								Project Abstract
							</Link>
							<span> </span>
							for reference.
						</li>
					</ul>
				</Box>
				<Box className={classes.subsection}>
					<Typography variant="h6" className={classes.subheading}>
						<span className={classes.uppercase}>Review by Mentors</span> 
						<span className={classes.red}> *</span>
					</Typography>
					<ul>
						<li>
							You can attach the Google doc link of your project abstract. Ensure that “anyone can suggest” setting is turned on in the share settings.
						</li>
						<li>
							You will NOT be allowed to send to mentors five days before the application deadline.
						</li>
						<li>
							It is advisable to view this video on<span> </span>
							<Link>
								Introduction to Google Docs
							</Link>
							.
						</li>
					</ul>
					<FormControl className={classes.margin}>
						<InputLabel htmlFor='reviewLink'>Google Document URL</InputLabel>
						<Input
							id='reviewLink'
							disabled={docLink?true:false}
							onChange={handleDocLinkChange}
							value={docLinkURL}
							error={docLinkError}
							startAdornment={
								<InputAdornment position='start'>
									<LinkIcon />
								</InputAdornment>
							}
						/>
					</FormControl>
					{
						docLink ? null :
							<Button
								variant='contained' 
								color='secondary' 
								className={classes.button}
								onClick={handleSendDocLink}
								disabled={docLink?true:false}
							>
								Send to mentors
								<SendIcon className={classes.rightIcon}/>
							</Button>
					}
				</Box>
				<Box className={classes.subsection}>
					<Typography variant='h5' className={classes.subheading+classes.uppercase} gutterBottom>
						UPLOAD FINAL VERSION OF DOCUMENT(S)
					</Typography>
					<Box className={classes.subsection2}>
						<Typography variant='h6' className={classes.subheading}>
							One page abstract of your technical/interdisciplinary project
							<span className={classes.red}> *</span>
						</Typography>
						{
							!abstract ?
								(
									<Box>
										<Button variant='contained' component='label' className={classes.button}>
											Choose File
											<input
												type='file'
												onChange={handleAbstractChange}
												style={{ display: 'none' }}
											/>
										</Button>
										<Button variant='contained' color='secondary' className={classes.button}>
											Preview
										</Button>
										<Button
											variant="contained"
											color="primary"
											className={classes.button}
											onClick={handleAbstractUpload}
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
											href={abstractLocation}
										>
										View File
										</Button>
									</Box>
								)
						}
					</Box>
					<Box className={classes.subsection2}>
						<Typography variant='h6' className={classes.subheading}>
							Further supporting images/videos (maximum two)
						</Typography>
						{
							!supportingFiles ?
								(
									<Box>
										<Button variant='contained' component='label' className={classes.button}>
										Choose File(s)
											<input
												multiple
												type='file'
												style={{ display: 'none' }}
												onChange={handleSupportingFilesChange}
											/>
										</Button>
										<Button variant='contained' color='secondary' className={classes.button}>
										Preview
										</Button>
										<Button
											variant="contained"
											color="primary"
											className={classes.button}
											onClick={handleSupportingFilesUpload}
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
											href={supportingFilesLocation[0]}
										>
										View File 1
										</Button>
										{ 
											supportingFilesLocation[1] ?
												(
													<Button
														variant="contained"
														color="primary"
														className={classes.button}
														target='_blank'
														href={supportingFilesLocation[1]}
													>
													View File 2
													</Button>
												):
												(null)
										}
									</Box>
								)
						}
					</Box>
				</Box>
			</Paper>
		);
	}
}