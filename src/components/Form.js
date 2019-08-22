import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import InfoIcon from '@material-ui/icons/Info';
import RateReviewIcon from '@material-ui/icons/RateReview';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import FormPage from './FormPage';
import { checkFormAccess } from '../utils/api/auth.helper';
import EmailVerify from './EmailVerify';
import { Box, CircularProgress } from '@material-ui/core';

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
	toolbar: { ...theme.mixins.toolbar, backgroundColor: '3f51b5' },

	drawerPaper: {
		width: drawerWidth,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
}));

export default function ResponsiveDrawer(props) {
	const { container } = props;
	const classes = useStyles();
	const theme = useTheme();
	const [isLoading, setIsLoading] = React.useState(true);
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [FormAccess, setFormAccess] = React.useState(false);
	const updateFormAccess = async ()=>{
		setIsLoading(true);
		setFormAccess(((await checkFormAccess()).data.data.access===true));
		setIsLoading(false);
	};
	React.useEffect(()=>{
		updateFormAccess();
	}, []);
	function handleDrawerToggle() {
		setMobileOpen(!mobileOpen);
	}

	const drawer = (
		<div>
			<div className={classes.toolbar} />
			{/* <Divider /> */}
			<List>
				<ListItem button component="a" href='/personal'>
					<ListItemIcon><InfoIcon/></ListItemIcon>
					<ListItemText primary={'Personal Information'} />
				</ListItem>
				<ListItem button component="a" href='/certificates'>
					<ListItemIcon><FileCopyIcon/></ListItemIcon>
					<ListItemText primary={'Certificates'} />
				</ListItem>
				<ListItem button component="a" href='/abstract'>
					<ListItemIcon><MailIcon/></ListItemIcon>
					<ListItemText primary={'Project Abstract'} />
				</ListItem>
				<ListItem button component="a" href='/essays'>
					<ListItemIcon><AttachFileIcon/></ListItemIcon>
					<ListItemText primary={'Essays'} />
				</ListItem>
				<ListItem button component="a" href='/review'>
					<ListItemIcon><RateReviewIcon/></ListItemIcon>
					<ListItemText primary={'Review'} />
				</ListItem>
			</List>
		</div>
	);
	if(isLoading){
		return <Box className={classes.centeredContainer}><CircularProgress size={60}/></Box>;
	}
	else{
		if (FormAccess)
			return (
				<div className={classes.root}>
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
					<FormPage></FormPage>
				</div>
			);
		else 
			return(
				<EmailVerify isInsti={true} onVerifySuccess={updateFormAccess}></EmailVerify>
			);
	}
}

