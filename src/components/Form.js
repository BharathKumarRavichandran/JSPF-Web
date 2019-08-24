import React from 'react';
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import FormPage from './FormPage';

export default function Form() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path='/' component={FormPage}/>
				<Route exact path='/personal' component={FormPage}/>
				<Route exact path='/certificates' component={FormPage}/>
				<Route exact path='/abstract' component={FormPage}/>
				<Route exact path='/essays' component={FormPage}/>
				<Route exact path='/review' component={FormPage}/>
				<Route render={ () => (
					<div id="notfound">
						<div className="notfound">
							<div className="notfound-404">
								<h1>4<span></span>4</h1>
							</div>
							<h2>Oops! Page Could Not Be Found</h2>
							<p>Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable</p>
							<Link to='/'>Back to homepage</Link>
						</div>
					</div>
				)}/>
			</Switch>
		</BrowserRouter>
	);
}

