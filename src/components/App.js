import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Form from './Form';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import PrivateRoute from './PrivateRoute';
import {checkSession as checkSessionHelper} from '../utils/api.helper';
import { CircularProgress, Box } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
	centeredContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height:'100vh'
	},
}));

export default function App() {
	const classes = useStyles();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [session, setSession] = useState(window.sessionStorage.getItem('session'));
	useEffect(() => {
		if(session){
			checkSession(session);
		}else{
			setIsLoading(false);
		}
	}, []);
	
	const checkSession = async (session) =>{
		if((await checkSessionHelper(session)).data.data.isLoggedIn==true){
			setIsLoggedIn(true);
			setIsLoading(false);
		}else{
			setIsLoggedIn(false);
			window.sessionStorage.removeItem('session');
			setSession(false);
			setIsLoading(false);
		}
	};

	if (isLoading) {
		return <Box className={classes.centeredContainer}><CircularProgress size={80}/></Box>;
	} else {
		return (
			<BrowserRouter>
				<div className="App">
					<Link to="/form">Form</Link>
					<Switch>
						<Route path="/login" render={(props) => <LoginPage {...props} setIsLoggedIn={(data) => setIsLoggedIn(data)} />} />
						{/* <Route path="/login" exact component={LoginPage} setIsLoggedIn={setIsLoggedIn}/> */}
						<Route path="/signup" exact component={SignUpPage}/>
						<PrivateRoute path="/form" component={Form} isLoggedIn={isLoggedIn} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}