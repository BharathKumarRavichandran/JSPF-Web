import { serverURL } from '../../config';
import axios, { post, get } from 'axios';

axios.defaults.validateStatus = () => true;
axios.defaults.withCredentials = true;

// Configurations
const config = {
	headers: {
		'content-type': 'multipart/form-data'
	}
};

const sendDocLink = async (docLink) => {
	return post(`${serverURL}/abstract/mentors/send`, { docLink });
};

const uploadFinalAbstract = async (file) => {
	const formData = new FormData();
	formData.append('projectAbstract', file);
	return post(`${serverURL}/abstract/final-abstract/upload`, formData, config);
};

const uploadSupportingFiles = async (file1, file2) => {
	const formData = new FormData();
	formData.append('supportingFiles', file1);
	if(file2){
		formData.append('supportingFiles', file2);
	}
	return post(`${serverURL}/abstract/supporting-files/upload`, formData, config);
};

const viewAllAbstract = async () => {
	return get(`${serverURL}/abstract/final/view/all`);
};

export {
	sendDocLink,
	uploadFinalAbstract,
	uploadSupportingFiles,
	viewAllAbstract
};