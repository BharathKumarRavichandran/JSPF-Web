import React,{useState,useEffect} from 'react';

import { makeStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import FormPage from './FormPage';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import LoginPage from './LoginPage';
import ForgotPassword from './ForgotPassword';
import SignUpPage from './SignUpPage';
import PrivateRoute from './PrivateRoute';
import {checkSession as checkSessionHelper} from '../utils/api/auth.helper';
import { CircularProgress, Box } from '@material-ui/core';

import './css/maintenancePage.css';

// Importing API utils
import { logout } from '../utils/api/auth.helper';

// Importing config
import { maintenance } from '../config/config';

// Create a new theme using Nunito Sans
const theme = createMuiTheme({
	typography: {
		fontFamily: 'Montserrat, Raleway, sans-serif'
	},
	centeredContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height:'100vh'
	},
});

/*
const useStyles = makeStyles(theme => ({
	centeredContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height:'100vh'
	},
}));
*/

// Add configuration settings for react-toastify
toast.configure({
	autoClose: 8000,
	draggable: false,
	position: toast.POSITION.BOTTOM_RIGHT
});

export default function App() {
	// const classes = useStyles();
	const classes = theme;

	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [session, setSession] = useState(window.sessionStorage.getItem('session'));

	const checkSession = async (session) =>{
		if((await checkSessionHelper(session)).data.data.isLoggedIn==true){
			if(window.sessionStorage.getItem('session')){
				setIsLoggedIn(true);
			}
			else{
				setIsLoggedIn(false);
			}
			setIsLoading(false);
		}else{
			setIsLoggedIn(false);
			window.sessionStorage.removeItem('session');
			setSession(false);
			setIsLoading(false);
		}
	};

	const handleLogout = async () => {
		try{
			window.sessionStorage.removeItem('session');
			await logout();
			setIsLoggedIn(false);
			setSession(false);
		} catch (error){
			// do something 
			toast.error(error.toString());
		}
	};

	useEffect(() => {
		if(session){
			checkSession(session);
		}else{
			setIsLoading(false);
		}
	}, []);

	if (isLoading) {
		return <Box className={classes.centeredContainer}><CircularProgress size={80}/></Box>;
	} else {
		return (
			<BrowserRouter>
				<MuiThemeProvider theme={theme}>
					<div className="App">
						{
							!maintenance ? (
								<Switch>
									<Route path='/login' render={(props) => <LoginPage {...props} setIsLoggedIn={(data) => setIsLoggedIn(data)} />} />
									<Route exact path='/signup' component={SignUpPage}/>
									<Route exact path='/forgot-password' component={ForgotPassword}/>
									<PrivateRoute path='/' component={FormPage} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
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
				</MuiThemeProvider>
			</BrowserRouter>
		);
	}
}