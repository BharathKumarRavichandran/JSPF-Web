import React from 'react';

import { Grid } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import InstructionsPage from './FormPages/InstructionsPage';
import PersonalInfoPage from './FormPages/PersonalInfoPage';
import CertificatesPage from './FormPages/CertificatesPage';
import AbstractPage from './FormPages/AbstractPage';
import EssaysPage from './FormPages/EssaysPage';
import ReviewPage from './FormPages/ReviewPage';
import { Route } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	toolbar: theme.mixins.toolbar,
	mainContent: {
		alignContent: 'center'
	}
}));

export default function FormPage() {
	const classes = useStyles();

	return (
          
		<div className={classes.root}>
			<main className={classes.content}>
				<div className={classes.toolbar} />
				<Grid container justify = 'center'>
					<Route exact path='/form' component={InstructionsPage}/>
					<Route exact path='/personal' component={PersonalInfoPage}/>
					<Route exact path='/certificates' component={CertificatesPage}/>
					<Route exact path='/abstract' component={AbstractPage}/>
					<Route exact path='/essays' component={EssaysPage}/>
					<Route exact path='/review' component={ReviewPage}/>
					{/* <Instructions></Instructions> */}
				</Grid>
			</main>
		</div>
	);
}