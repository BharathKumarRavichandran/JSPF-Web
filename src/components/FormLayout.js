import React from 'react';
import { Link, Redirect } from 'react-router-dom';


import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import MailIcon from '@material-ui/icons/Mail';
import InfoIcon from '@material-ui/icons/Info';
import RateReviewIcon from '@material-ui/icons/RateReview';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// Importing API utils
import { logout } from '../utils/api/auth.helper';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
	},
	appHeader: {
		margin: '0 auto',
	},
	appBar: {
		marginLeft: drawerWidth,
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${drawerWidth}px)`,
		},
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
	toolbar: { ...theme.mixins.toolbar, backgroundColor: '3f51b5' },
	centeredContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height:'100vh'
	},
	drawerPaper: {
		width: drawerWidth,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
}));

export default function FormLayout(props) {
	const { container } = props;
	const classes = useStyles();
	const theme = useTheme();

	const [redirectToLogin, setRedirectToLogin] = React.useState(false);
	const [mobileOpen, setMobileOpen] = React.useState(false);

	function handleDrawerToggle() {
		setMobileOpen(!mobileOpen);
	}
    
	const handleLogout = async () => {
		window.sessionStorage.removeItem('session');
		await logout();
		setRedirectToLogin(true);
	};

	const drawer1 = (
		<div>
			<div className={classes.toolbar} />
			{/* <Divider /> */}
			<List>
				<ListItem button component={Link} to='/'>
					<ListItemIcon><InfoIcon/></ListItemIcon>
					<ListItemText primary={'Instructions'} />
				</ListItem>
				<ListItem button component={Link} to='/personal'>
					<ListItemIcon><PersonIcon/></ListItemIcon>
					<ListItemText primary={'Personal Information'} />
				</ListItem>
				<ListItem button component={Link} to='/certificates'>
					<ListItemIcon><FileCopyIcon/></ListItemIcon>
					<ListItemText primary={'Certificates'} />
				</ListItem>
				<ListItem button component={Link} to='/abstract'>
					<ListItemIcon><MailIcon/></ListItemIcon>
					<ListItemText primary={'Project Abstract'} />
				</ListItem>
				<ListItem button component={Link} to='/essays'>
					<ListItemIcon><AttachFileIcon/></ListItemIcon>
					<ListItemText primary={'Essays'} />
				</ListItem>
				<ListItem button component={Link} to='/review'>
					<ListItemIcon><RateReviewIcon/></ListItemIcon>
					<ListItemText primary={'Review'} />
				</ListItem>
				<ListItem button component="button" onClick={handleLogout}>
					<ListItemIcon><ExitToAppIcon/></ListItemIcon>
					<ListItemText primary={'Logout'} />
				</ListItem>
			</List>
		</div>
	);
	
	const drawer2 = (
		<div>
			<div className={classes.toolbar} />
			{/* <Divider /> */}
			<List>
				<ListItem button component={Link} to='/application'>
					<ListItemIcon><InfoIcon/></ListItemIcon>
					<ListItemText primary={'Application'} />
				</ListItem>
				<ListItem button component="button" onClick={handleLogout}>
					<ListItemIcon><ExitToAppIcon/></ListItemIcon>
					<ListItemText primary={'Logout'} />
				</ListItem>
			</List>
		</div>
	);

	const drawer = (
		(props.submissionStatus) ? (
			// Render drawer2 if form is submitted
			drawer2
		) : (
			// Render drawer1 if form is submitted
			drawer1
		)
	);

	if(redirectToLogin){
		return <Redirect push to={{ pathname: '/login' }} />;
	}
	else{
		return (
			<div>
				<CssBaseline />
				<AppBar position="fixed" className={classes.appBar}>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="Open drawer"
							edge="start"
							onClick={handleDrawerToggle}
							className={classes.menuButton}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" noWrap className={classes.appHeader}>
                            JITHESHRAJ SCHOLARSHIP APPLICATION PORTAL 2019-2020
						</Typography>
					</Toolbar>
				</AppBar>
				<nav className={classes.drawer} aria-label="Mailbox folders">
					{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
					<Hidden smUp implementation="css">
						<Drawer
							container={container}
							variant="temporary"
							anchor={theme.direction === 'rtl' ? 'right' : 'left'}
							open={mobileOpen}
							onClose={handleDrawerToggle}
							classes={{
								paper: classes.drawerPaper,
							}}
							ModalProps={{
								keepMounted: true, // Better open performance on mobile.
							}}
						>
							{drawer}
						</Drawer>
					</Hidden>
					<Hidden xsDown implementation="css">
						<Drawer
							classes={{
								paper: classes.drawerPaper,
							}}
							variant="permanent"
							open
						>
							{drawer}
						</Drawer>
					</Hidden>
				</nav>
			</div>
		);
	}
}