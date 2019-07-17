import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Form from './Form';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import PrivateRoute from './PrivateRoute';

const useStyles = makeStyles(theme => ({
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	toolbar: theme.mixins.toolbar,
}));

export default function App() {
	const classes = useStyles();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
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