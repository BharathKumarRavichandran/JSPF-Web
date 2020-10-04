import { url } from '../../config/config';
import axios, { post, get } from 'axios';

axios.defaults.validateStatus = () => true;
axios.defaults.withCredentials = true;

const serverURL = url.API_BASE_URL;

const updateInfo = async (introduction, gender, disabilityStatus, disabilityDescription, nationality, firstGenStudent, refugee, pronoun) => {
	return post(`${serverURL}/personal-info/update`, {
		introduction,
		gender,
		disabilityStatus,
		disabilityDescription,
		nationality,
		firstGenStudent,
		refugee,
		pronoun
	});
};

const getInfo = async () => {
	return get(`${serverURL}/personal-info/view/all`);
};

export {
	updateInfo,
	getInfo
};