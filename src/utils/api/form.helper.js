import { url } from '../../config/config';
import axios, { post, get } from 'axios';

axios.defaults.validateStatus = () => true;
axios.defaults.withCredentials = true;

const serverURL = url.API_BASE_URL;

const generateForm = () => {
	return post(`${serverURL}/form/generate`);
};

const submitForm = () => {
	return post(`${serverURL}/form/submit`);
};

const getFormStatus = () => {
	return get(`${serverURL}/form/status`);
};

const viewForm = () => {
	return get(`${serverURL}/form/view`);
};

export {
	generateForm,
	submitForm,
	getFormStatus,
	viewForm
};