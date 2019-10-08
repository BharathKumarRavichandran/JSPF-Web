import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';

import Typography from '@material-ui/core/Typography';
import { CircularProgress, Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button  from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

// Importing API utils
import { viewForm } from '../../utils/api/form.helper';

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
	button: {
		padding: theme.spacing(0.5)
	},
	link:{
		padding:theme.spacing(1),
		width:'100%',
		height:'100%',
		color:'white',
		textDecoration:'none',
		display:'flex'
	},
	heading: {
		textAlign: 'center'
	}
}));

export default function ApplicationPage(props) {
	const classes = useStyles();
    
	const [isLoading, setIsLoading] = useState(true);
	const [applicationFilePath, setApplicationFilePath] = useState(null);

	const getApplicationLink = async () => {
		try{
			const serverResponse = await viewForm();
			if(serverResponse.data.status_code==200 && serverResponse.data.data){
				setApplicationFilePath(serverResponse.data.data.applicationFilePath);
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
				await getApplicationLink();
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
		return (
			<Paper className={classes.paper}>
				<Typography variant="h4" className={classes.heading} gutterBottom>Application Status</Typography>
				<Typography paragraph>
                    Your application is submitted and is being reviewed. Meanwhile, check your submitted application form below.
				</Typography>
				<Box className={classes.centeredContainer}>
					<Button variant='contained' color='primary' className={classes.button}>
						<Link to={applicationFilePath} className={classes.link}>View Application</Link>
					</Button>
				</Box>
			</Paper>
		);
	}
}