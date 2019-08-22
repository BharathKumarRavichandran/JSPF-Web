import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';

export default function PrivateRoute({ component: Component,isLoggedIn, exact,path, ...rest }){
	return (
		<Route
			path={path}
			exact={exact}
			render={
				props => {
					return isLoggedIn ? (
						<Component {...props} {...rest} />
					) : (
						<Redirect push to={{ pathname: '/login', state: { from: props.location } }} />
					);
				}
			}
		/>
	);
}

PrivateRoute.propTypes = {
	location: PropTypes.object.isRequired
};