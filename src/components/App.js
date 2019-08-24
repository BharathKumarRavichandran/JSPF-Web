import React,{useState,useEffect} from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Form from './Form';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import PrivateRoute from './PrivateRoute';
import {checkSession as checkSessionHelper} from '../utils/api/auth.helper';
import { CircularProgress, Box } from '@material-ui/core';

import './css/maintenancePage.css';

// Importing config
import { maintenance } from '../config/config';

const useStyles = makeStyles(theme => ({
	centeredContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height:'100vh'
	},
}));

// Add configuration settings for react-toastify
toast.configure({
	autoClose: 8000,
	draggable: false,
	position: toast.POSITION.BOTTOM_RIGHT
});

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
					{
						!maintenance ? (
							<Switch>
								<Route path="/login" render={(props) => <LoginPage {...props} setIsLoggedIn={(data) => setIsLoggedIn(data)} />} />
								{/* <Route path="/login" exact component={LoginPage} setIsLoggedIn={setIsLoggedIn}/> */}
								<Route path="/signup" exact component={SignUpPage}/>
								<PrivateRoute path="/" component={Form} isLoggedIn={isLoggedIn} />
							</Switch>
						) : (
							<Switch>
								<Route render={() => (
									<div id="maintenance">
										<div className="maintenance">
											<div className="maintenance-image">
												<span></span>
											</div>
											<h2>Oops! We are under maintenance</h2>
											<p>Sorry, we are trying our best to fix the issues! Come back soon!</p>
										</div>
									</div>
								)}/>
							</Switch>
						)
					}
				</div>
			</BrowserRouter>
		);
	}
}