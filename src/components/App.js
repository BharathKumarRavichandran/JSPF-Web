import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Form from './Form';
import { BrowserRouter, Route, Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	toolbar: theme.mixins.toolbar,
}));

export default function App() {
	const classes = useStyles();

	return (
		<BrowserRouter>
			<div className="App">
				<Link to="/form">Form</Link>
				<Route path="/form" component={Form}/>
			</div>
		</BrowserRouter>
	);
}