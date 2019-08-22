import { serverURL } from '../../config';
import axios, { post, get } from 'axios';

axios.defaults.validateStatus = () => true;
axios.defaults.withCredentials = true;

const updateInfo = async (introduction, gender, disability, nationality, firstGenStudent, refugee, pronoun) => {
	return post(`${serverURL}/personal-info/update`, {
		introduction,
		gender,
		disability,
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