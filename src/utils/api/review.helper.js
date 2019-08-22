import { serverURL } from '../../config';
import axios, { post, get } from 'axios';

axios.defaults.validateStatus = () => true;
axios.defaults.withCredentials = true;

const getAllPendingRequirements = async () => {
	return get(`${serverURL}/requirements/pending/all`);
}

const getNecessaryPendingRequirements = async () => {
	return get(`${serverURL}/requirements/pending/necessary`);
}

const updateSignature = async (signature) => {
	return post(`${serverURL}/signature/update`, { signature });
};

const getSignature = async () => {
	return get(`${serverURL}/signature/get`);
};

const viewForm = () => {
	return post(`${serverURL}/form/view`);
};

const submitForm = () => {
	return post(`${serverURL}/form/submit`);
};

export {
	getAllPendingRequirements,
	getNecessaryPendingRequirements,
	updateSignature,
	getSignature,
	viewForm,
	submitForm
};