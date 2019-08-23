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
import { sendSOPToMentors, sendCommunityToMentors, sendSocietyToMentors, uploadFinalSOP, uploadFinalCommunity, uploadFinalSociety, viewFinalEssays } from '../../utils/api/essays.helper';


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

export default function EssaysPage(props) {
	const classes = useStyles();

	const [isLoading, setIsLoading] = useState(true);

	const [sopError, setSopError] =  useState(false);
	const [communityError, setCommunityError] = useState(false);
	const [societyError, setSocietyError] = useState(false);

	const [sopMentor, setSopMentor] = useState(false);
	const [sopMentorURL, setSopMentorURL] = useState('');
	const [communityMentor, setCommunityMentor] = useState(false);
	const [communityMentorURL, setCommunityMentorURL] = useState('');
	const [societyMentor, setSocietyMentor] = useState(false);
	const [societyMentorURL, setSocietyMentorURL] = useState('');
	
	const [sopEssay, setSopEssay] = useState(false);
	const [sopEssayLocation, setSopEssayLocation] = useState(null);
	const [communityEssay, setCommunityEssay] = useState(false);
	const [communityEssayLocation, setCommunityEssayLocation] = useState(null);
	const [societyEssay, setSocietyEssay] = useState(false);
	const [societyEssayLocation, setSocietyEssayLocation] = useState(null);

	const getAllEssays = async () => {
		try {
			const serverResponse = await viewFinalEssays();
			if(serverResponse.data.status_code==200){
				const mentorEssays = serverResponse.data.data.essays.mentors;
				const finalEssays = serverResponse.data.data.essays.final;
				if(mentorEssays){
					if(mentorEssays.sop){
						setSopMentorURL(mentorEssays.sop);
						setSopMentor(true);
					}
					if(mentorEssays.community){
						setCommunityMentorURL(mentorEssays.community);
						setCommunityMentor(true);
					}
					if(mentorEssays.society){
						setSocietyMentorURL(mentorEssays.society);
						setSocietyMentor(true);
					}
				}
				if(finalEssays){
					if(finalEssays.sop){
						setSopEssayLocation(finalEssays.sop);
						setSopEssay(true);
					}
					if(finalEssays.community){
						setCommunityEssayLocation(finalEssays.community);
						setCommunityEssay(true);
					}
					if(finalEssays.society){
						setSocietyEssayLocation(finalEssays.society);
						setSocietyEssay(true);
					}
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

	const handleLinkChange = async(e, link) => {
		switch(link) {
			case 'sop':
				if(!sopMentor){
					setSopMentorURL(e.target.value);
					setSopError(false);
				}
				else{
					toast.error('Cannot change link, already sent document link to mentors.');
				}
				break;

			case 'community':
				if(!communityMentor){
					setCommunityMentorURL(e.target.value);
					setCommunityError(false);
				}
				else{
					toast.error('Cannot change link, already sent document link to mentors.');
				}
				break;

			case 'society':
				if(!societyMentor){
					setSocietyMentorURL(e.target.value);
					setSocietyError(false);
				}
				else{
					toast.error('Cannot change link, already sent document link to mentors.');
				}
				break;
		}
	};

	const handleLinkSend = async (link) => {
		switch(link) {
			case 'sop':
				if(!sopMentor){
					if(sopMentorURL){
						const response = await sendSOPToMentors(sopMentorURL);
						if(response.data.status_code==200){
							setSopMentor(true);
							toast.success(response.data.message);
						}
						else{
							toast.error(response.data.message);
						}
					}
					else{
						setSopError(true);
					}
				}
				else{
					toast.error('Cannot change link, already sent document link to mentors.');
				}
				break;

			case 'community':
				if(!communityMentor){
					if(communityMentorURL){
						const response = await sendCommunityToMentors(communityMentorURL);
						if(response.data.status_code==200){
							setCommunityMentor(true);
							toast.success(response.data.message);
						}
						else{
							toast.error(response.data.message);
						}
					}
					else {
						setCommunityError(true);
					}
				}
				else{
					toast.error('Cannot change link, already sent document link to mentors.');
				}
				break;

			case 'society':
				if(!societyMentor){
					if(societyMentorURL){
						const response = await sendSocietyToMentors(societyMentorURL);
						if(response.data.status_code==200){
							setSocietyMentor(true);
							toast.success(response.data.message);
						}
						else{
							toast.error(response.data.message);
						}
					}
					else {
						setSocietyError(true);
					}
				}
				else{
					toast.error('Cannot change link, already sent document link to mentors.');
				}
				break;
		}
	};

	const handleFileChange = async (e, field) => {
		switch(field) {
			case 'sop':
				if(!sopEssay)
					setSopEssayLocation(e.target.files[0]);
				else{
					toast.error('File already uploaded.');
				}
				break;

			case 'community':
				if(!communityEssay)
					setCommunityEssayLocation(e.target.files[0]);
				else{
					toast.error('File already uploaded.');
				}
				break;

			case 'society':
				if(!societyEssay)
					setSocietyEssayLocation(e.target.files[0]);
				else{
					toast.error('File already uploaded.');
				}
				break;
		}
	};

	const handleFileUpload = async (field) => {
		switch(field) {
			case 'sop':
				if(!sopEssay){
					if(sopEssayLocation){
						const uploadResponse = await uploadFinalSOP(sopEssayLocation);
						if(uploadResponse.data.status_code==200){
							setSopEssay(true);
							setSopEssayLocation(uploadResponse.data.data.filePath);
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

			case 'community':
				if(!communityEssay){
					if(communityEssayLocation){
						const uploadResponse = await uploadFinalCommunity(communityEssayLocation);
						if(uploadResponse.data.status_code==200){
							setCommunityEssay(true);
							setCommunityEssayLocation(uploadResponse.data.data.filePath);
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

			case 'society':
				if(!societyEssay){
					if(societyEssayLocation){
						const uploadResponse = await uploadFinalSociety(societyEssayLocation);
						if(uploadResponse.data.status_code==200){
							setSocietyEssay(true);
							setSocietyEssayLocation(uploadResponse.data.data.filePath);
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
				await getAllEssays();
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
				<Typography variant="h3" className={classes.heading} gutterBottom>Essays</Typography>
				<Box>
					<Box className={classes.subsection}>
						<Typography variant="h6" className={classes.subheading}>
							INSTRUCTIONS COMMON TO ALL ESSAYS
						</Typography>
						<ul>
							<li>
								All essays must be submitted as PDFs.
							</li>
							<li>
								The text should be typed with "Normal" margin (2.54 cm on all four sides), font Calibri and font size 12. All of these options are available on Microsoft Word and other common word processor tools.
							</li>
							<li>
								There is a strict restriction on the word limit associated with each essay. Words beyond the prescribed limit will be ignored.
							</li>
						</ul>
					</Box>
					<Box className={classes.subsection}>
						<Typography variant='h6' className={classes.subheading}>
							Statement of Purpose essay
						</Typography>
						<ul>
							<li>
								Explain the pivotal moments during your scholarship application process that helped you explore and achieve clarity about yourself. How do you intend to leverage the learning from this process through the rest of your college life?<div>
									<i>Maximum 750 words </i>
									<Link to=''>Put link here</Link>
								</div>
							</li>
						</ul>
					</Box>
					<Box className={classes.subsection}>
						<Typography variant='h6' className={classes.subheading}>
							'For your Community' essay
						</Typography>
						<ul>
							<li>
								Elucidate on a prevailing problem in NIT Trichy campus. What was its origin and what are its repercussions? Suggest an implementable solution to alleviate the issue.
								<div>
									<i>Maximum 500 words </i>
									<Link to=''>Put link here</Link>
								</div>
							</li>
						</ul>
					</Box>
					<Box className={classes.subsection}>
						<Typography variant='h6' className={classes.subheading}>
							'For the Society' essay
						</Typography>
						<ul>
							<li>
								Discuss a current technological trend/issue and provide original personal insights on the impact it has on other aspects of the society (economy, business, environment, psychology, etc)
								<div>
									<i>Maximum 500 words </i>
									<Link to=''>Put link here</Link>
								</div>
							</li>
						</ul>
					</Box>
				</Box>
				<Box className={classes.subsection}>
					<Typography variant='h5' className={classes.subheading}>
						<span className={classes.uppercase}>Review by Mentors</span> 
					</Typography>
					<ul>
						<li>
							You can attach the Google doc link of your essays. Ensure that “anyone can suggest” setting is turned on in the share settings.
						</li>
					</ul>
					<Box>
						<Box className={classes.subsection}>
							<Typography variant='h6' className={classes.subheading}>
								Statement of Purpose
							</Typography>
							<FormControl className={classes.margin}>
								<InputLabel htmlFor='sopLink'>Google Doc Link</InputLabel>
								<Input
									id='sopLink'
									disabled={sopMentor?true:false}
									onChange={ (e) => {handleLinkChange(e,'sop');} }
									value={sopMentorURL}
									error={sopError}
									startAdornment={
										<InputAdornment position='start'>
											<LinkIcon />
										</InputAdornment>
									}
								/>
							</FormControl>
							{
								sopMentor ? null :
									<Button
										variant='contained' 
										color='secondary' 
										className={classes.button}
										onClick={ () => handleLinkSend('sop')}
										disabled={sopMentor?true:false}
									>
										Send to mentors
										<SendIcon className={classes.rightIcon}/>
									</Button>
							}
						</Box>
						<Box className={classes.subsection}>
							<Typography variant='h6' className={classes.subheading}>
								‘For the community’ essay
							</Typography>
							<FormControl className={classes.margin}>
								<InputLabel htmlFor='communityLink'>Google Doc Link</InputLabel>
								<Input
									id='communityLink'
									disabled={communityMentor?true:false}
									onChange={ (e) => {handleLinkChange(e,'community');} }
									value={communityMentorURL}
									error={communityError}
									startAdornment={
										<InputAdornment position='start'>
											<LinkIcon />
										</InputAdornment>
									}
								/>
							</FormControl>
							{
								communityMentor ? null :
									<Button
										variant='contained' 
										color='secondary' 
										className={classes.button}
										onClick={ () => handleLinkSend('community')}
										disabled={communityMentor?true:false}
									>
										Send to mentors
										<SendIcon className={classes.rightIcon}/>
									</Button>
							}
						</Box>
						<Box className={classes.subsection}>
							<Typography variant='h6' className={classes.subheading}>
								‘For the society’ essay
							</Typography>
							<FormControl className={classes.margin}>
								<InputLabel htmlFor='societyLink'>Google Doc Link</InputLabel>
								<Input
									id='societyLink'
									disabled={societyMentor?true:false}
									onChange={ (e) => {handleLinkChange(e,'society');} }
									value={societyMentorURL}
									error={societyError}
									startAdornment={
										<InputAdornment position='start'>
											<LinkIcon />
										</InputAdornment>
									}
								/>
							</FormControl>
							{
								societyMentor ? null :
									<Button
										variant='contained' 
										color='secondary' 
										className={classes.button}
										onClick={ () => handleLinkSend('society')}
										disabled={societyMentor?true:false}
									>
										Send to mentors
										<SendIcon className={classes.rightIcon}/>
									</Button>
							}
						</Box>
					</Box>
				</Box>
				<Box>
					<Typography variant='h5' className={classes.subheading}>
						<span className={classes.uppercase}>UPLOAD FINAL VERSION OF ESSAYS</span>
					</Typography>
					<Box>
						<Box className={classes.subsection}>
							<Typography variant='h6' className={classes.subheading}>
								Statement of Purpose
								<span className={classes.red}> *</span>
							</Typography>
							{
								!sopEssay ?
									(
										<Box>
											<Button variant="contained" component="label" className={classes.button}>
											Choose File
												<input
													type="file"
													onChange={ (e) => { handleFileChange(e,'sop'); } }
													style={{ display: 'none' }}
												/>
											</Button>
											<Button variant="contained" color="secondary" className={classes.button}>
											Preview
											</Button>
											<Button
												variant="contained"
												color="primary"
												className={classes.button}
												onClick={ () => handleFileUpload('sop') }
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
												href={sopEssayLocation}
											>
											View File
											</Button>
										</Box>
									)
							}
						</Box>
						<Box className={classes.subsection}>
							<Typography variant='h6' className={classes.subheading}>
								‘For the community’ essay
								<span className={classes.red}> *</span>
							</Typography>
							{
								!communityEssay ?
									(
										<Box>
											<Button variant="contained" component="label" className={classes.button}>
											Choose File
												<input
													type="file"
													onChange={ (e) => { handleFileChange(e,'community'); } }
													style={{ display: 'none' }}
												/>
											</Button>
											<Button variant="contained" color="secondary" className={classes.button}>
											Preview
											</Button>
											<Button
												variant="contained"
												color="primary"
												className={classes.button}
												onClick={ () => handleFileUpload('community') }
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
												href={communityEssayLocation}
											>
											View File
											</Button>
										</Box>
									)
							}
						</Box>
						<Box className={classes.subsection}>
							<Typography variant='h6' className={classes.subheading}>
								‘For the society’ essay
								<span className={classes.red}> *</span>
							</Typography>
							{
								!societyEssay ?
									(
										<Box>
											<Button variant="contained" component="label" className={classes.button}>
											Choose File
												<input
													type="file"
													onChange={ (e) => { handleFileChange(e,'society'); } }
													style={{ display: 'none' }}
												/>
											</Button>
											<Button variant="contained" color="secondary" className={classes.button}>
											Preview
											</Button>
											<Button
												variant="contained"
												color="primary"
												className={classes.button}
												onClick={ () => handleFileUpload('society') }
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
												href={societyEssayLocation}
											>
											View File
											</Button>
										</Box>
									)
							}
						</Box>
					</Box>
				</Box>
			</Paper>
		);
	}
}