import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Instructions from './FormPages/Instructions';
import { Route } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	toolbar: theme.mixins.toolbar,
}));

export default function FormPage() {
	const classes = useStyles();

	return (
          
		<div className={classes.root}>
			<main className={classes.content}>
				<div className={classes.toolbar} />
				<Route path="/form" component={Instructions}/>
				{/* <Instructions></Instructions> */}
			</main>
		</div>
	);
}