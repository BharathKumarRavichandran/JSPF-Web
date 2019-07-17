import React from 'react';
import {Route,Redirect} from 'react-router-dom';

export default function PrivateRoute({ component: Component,isLoggedIn, exact,path, ...rest }){
	if(isLoggedIn)console.log('sneak 0');
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