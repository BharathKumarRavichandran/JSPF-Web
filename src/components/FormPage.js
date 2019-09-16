import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import { toast } from 'react-toastify';

import { Box, CircularProgress, Grid } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import InstructionsPage from './FormPages/InstructionsPage';
import PersonalInfoPage from './FormPages/PersonalInfoPage';
import CertificatesPage from './FormPages/CertificatesPage';
import AbstractPage from './FormPages/AbstractPage';
import EssaysPage from './FormPages/EssaysPage';
import ReviewPage from './FormPages/ReviewPage';
import ApplicationPage from './FormPages/ApplicationPage';
import EmailVerify from './EmailVerify';

import FormLayout from './FormLayout';

import './css/notFoundPage.css';

// Importing API utils
import { checkFormAccess } from '../utils/api/auth.helper';
import { getFormStatus } from '../utils/api/form.helper';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	toolbar: theme.mixins.toolbar,
	mainContent: {
		alignContent: 'center'
	},
	appHeader: {
		margin: '0 auto',
	},
	appBar: {
		marginLeft: drawerWidth,
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${drawerWidth}px)`,
		},
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
	centeredContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height:'100vh'
	},
	drawerPaper: {
		width: drawerWidth,
	}
}));

export default function FormPage(props) {
	const { container } = props;
	const classes = useStyles();

	const [isLoading, setIsLoading] = useState(true);
	const [FormAccess, setFormAccess] = useState(false);
	const [submissionStatus, setSubmissionStatus] = useState(false);

	const updateFormAccess = async () => {
		setFormAccess(((await checkFormAccess()).data.data.access===true));
	};

	const getFormSubmissionStatus = async () => {
		try{
			const serverResponse = await getFormStatus();
			if(serverResponse.data.status_code==200 && serverResponse.data.data){
				const isSubmitted = serverResponse.data.data.submissionStatus;
				setSubmissionStatus(isSubmitted);
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
	
	useEffect(()=>{
		async function fetchAPI() {
			try {
				setIsLoading(true);
				await updateFormAccess();
				await getFormSubmissionStatus();
				setIsLoading(false);
			} catch(error) {
				toast.error(error.toString());
			}
		}
		fetchAPI();
	}, []);
	
	if(isLoading){
		return <Box className={classes.centeredContainer}><CircularProgress size={60}/></Box>;
	}
	else {
		if (FormAccess) {
			return (
				<BrowserRouter>
					<div className={classes.root}>
						<FormLayout
							submissionStatus={submissionStatus}
						/>
						<div>
							<main className={classes.content}>
								<div className={classes.toolbar} />
								<Grid container justify = 'center'>
									{
										(!submissionStatus) ? (
											<Switch>
												<Route exact path='/' component={InstructionsPage}/>
												<Route exact path='/personal' component={PersonalInfoPage}/>
												<Route exact path='/certificates' component={CertificatesPage}/>
												<Route exact path='/abstract' component={AbstractPage}/>
												<Route exact path='/essays' component={EssaysPage}/>
												<Route exact path='/review' component={ReviewPage}/>
												<Route render={ () => (
													<div id="notfound">
														<div className="notfound">
															<div className="notfound-404">
																<h1>4<span></span>4</h1>
															</div>
															<h2>Oops! Page Could Not Be Found</h2>
															<p>Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable</p>
															<Link to='/'>Back to homepage</Link>
														</div>
													</div>
												)}/>
											</Switch>
										):(
											<Switch>			
												<Route exact path='/' 
													render={
														(props) => {
															props.history.push('/application');
														}
													}
												/>
												<Route exact path='/application' component={ApplicationPage}/>
												<Route render={ () => (
													<div id="notfound">
														<div className="notfound">
															<div className="notfound-404">
																<h1>4<span></span>4</h1>
															</div>
															<h2>Oops! Page Could Not Be Found</h2>
															<p>Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable</p>
															<Link to='/application'>Back to homepage</Link>
														</div>
													</div>
												)}/>
											</Switch>
										)
									}
								</Grid>
							</main>
						</div>
					</div>
				</BrowserRouter>
			);
		}
		else {
			return(
				<EmailVerify isInsti={true} onVerifySuccess={updateFormAccess}></EmailVerify>
			);
		}
	}
}