const path = require('path');

// Declaring globals
const BASE_DIR = __dirname + '/./../../';


module.exports = {
	date: {
		START_DATE: process.env.START_DATE,
		END_DATE: process.env.END_DATE,
		START_DATE_JS: process.env.START_DATE_JS,
		END_DATE_JS: process.env.END_DATE_JS,
		START_YEAR: process.env.START_YEAR,
		END_YEAR: process.env.END_YEAR
	},
	debug: process.env.debug,
	directory: {
		BASE_DIR: BASE_DIR,
		CONFIG_DIR: path.join(BASE_DIR, 'src', 'config'),
		LOGS_DIR: path.join(BASE_DIR, 'storage', 'logs'),
		PUBLIC_DIR: path.join(BASE_DIR, 'public'),
		SRC_DIR: path.join(BASE_DIR, 'src'),
		APP_STATIC_DIR: path.join(BASE_DIR, 'public'),
		UPLOADS_DIR: path.join(BASE_DIR, 'public', 'uploads')
	},
	environment: process.env.environment,
	ports: {
		APP_PORT: process.env.APP_PORT,
	},
	url: {
		API_BASE_URL: process.env.API_BASE_URL
	}
};