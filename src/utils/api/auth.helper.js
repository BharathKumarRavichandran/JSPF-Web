import { url } from '../../config/config';
import axios, { post, get } from 'axios';

axios.defaults.validateStatus = () => true;
axios.defaults.withCredentials = true;

const serverURL = url.API_BASE_URL;

const loginSubmit = (email, password) => {
	return post(`${serverURL}/auth/student/login`, { email, password });
};

const sendVerificationCode = (email, isInsti) => {
	return post(`${serverURL}/auth/student/${isInsti ? 'insti-' : ''}email/verification-code/send`, isInsti ? ({ instiEmail: email }) : ({ email }));
};

const checkCode = async (email, verificationCode, isInsti) => {
	if (isInsti)
		return post(`${serverURL}/auth/student/insti-email/verification-code/verify`,{ instiEmail: email, verificationCode });
	else
		return get(`${serverURL}/auth/student/email/verification-code/check`,{params:{ email, verificationCode }});
};

const checkSession = async (email) => {
	return get(`${serverURL}/auth/student/session/check`, {params:{email}});
};

const registerStudent = async (values) => {
	return post(`${serverURL}/auth/student/register`, values);
};

const checkFormAccess = async () => {
	return get(`${serverURL}/form/access`);
};

const forgotPassword = async (email) => {
	return post(`${serverURL}/auth/student/password/forgot`, { email });
}

const resetPassword = async (values) => {
	return post(`${serverURL}/auth/student/password/reset`, values);
}

const logout = async () => {
	return post(`${serverURL}/auth/student/logout`);
};

export {
	loginSubmit,
	sendVerificationCode,
	checkCode,
	registerStudent,
	checkFormAccess,
	checkSession,
	forgotPassword,
	resetPassword,
	logout
};