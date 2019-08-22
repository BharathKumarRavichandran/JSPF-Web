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

const uploadGradeSheetSem1 = async (file) => {
	const formData = new FormData();
	formData.append('gradeSheetSem1', file);
	return post(`${serverURL}/certificates/gradeSheetSem1/upload`, formData, config);
};

const uploadInstiCertificate = async (file) => {
	const formData = new FormData();
	formData.append('instiCertificate', file);
	return post(`${serverURL}/certificates/instiCertificate/upload`, formData, config);
};

const uploadNonInstiCertificate = async (file) => {
	const formData = new FormData();
	formData.append('nonInstiCertificate', file);
	return post(`${serverURL}/certificates/nonInstiCertificate/upload`, formData, config);
};

const uploadGradeSheetMOOC = async (file) => {
	const formData = new FormData();
	formData.append('gradeSheetMOOC', file);
	return post(`${serverURL}/certificates/gradeSheetMOOC/upload`, formData, config);
};

const viewAllCertificates = async () => {
	return get(`${serverURL}/certificates/view/all`);
};

export {
	uploadGradeSheetSem1,
	uploadInstiCertificate,
	uploadNonInstiCertificate,
	uploadGradeSheetMOOC,
	viewAllCertificates
};