import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	paper: {
		// flexGrow: 1,
		padding: theme.spacing(3),
	},
	heading: {
		textAlign: 'center'
	}
}));

export default function Instructions(props) {
	console.log(props.match);
	const classes = useStyles();
	return (
		<Paper className={classes.paper}>
			<Typography variant="h3" className={classes.heading} gutterBottom>GENERAL INSTRUCTIONS</Typography>
			<Typography paragraph>
                Candidates must submit all documents adhering to the instructions provided in each section.
                All documents produced by the candidate MUST be original. If found guilty of plagiarism or malpractice at any stage of the scholarship process, the application will forfeit its candidacy.
                This application must be submitted on/before the deadline .
                No submission after the deadline will be entertained.
			</Typography>
			<Typography paragraph>
                Be sure to save your application frequently as you proceed to avoid loss of data.
			</Typography>
		</Paper>
	);
}