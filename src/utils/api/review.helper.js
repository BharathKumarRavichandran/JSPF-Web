import { url } from '../../config/config';
import axios, { post, get } from 'axios';

axios.defaults.validateStatus = () => true;
axios.defaults.withCredentials = true;

const serverURL = url.API_BASE_URL;

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

export {
	getAllPendingRequirements,
	getNecessaryPendingRequirements,
	updateSignature,
	getSignature
};