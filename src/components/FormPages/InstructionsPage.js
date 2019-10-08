import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Paper, Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button  from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles(theme => ({
	paper: {
		// flexGrow: 1,
		padding: theme.spacing(3),
		width: 'inherit'
	},
	centeredContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	button:{
		padding:'0',
	},
	link:{
		padding:theme.spacing(1),
		paddingLeft:theme.spacing(2),
		width:'100%',
		height:'100%',
		color:'white',
		textDecoration:'none',
		display:'flex'
	},
	heading: {
		textAlign: 'center',
		textTransform: 'uppercase',
		fontWeight: '300'
	}
}));

export default function InstructionsPage(props) {
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
			<Box className={classes.centeredContainer}>
				<Button variant='contained' color='primary' className={classes.button}>
					<Link to='/personal' className={classes.link}>Next <NavigateNextIcon/></Link>
				</Button>
			</Box>

		</Paper>
	);
}