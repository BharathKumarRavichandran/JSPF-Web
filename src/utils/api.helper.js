import {serverURL} from '../config';
import axios,{post,get} from 'axios';

axios.defaults.validateStatus = ()=>true;

const loginSubmit = (email,password)=>{
	return post(`${serverURL}/auth/student/login`,{email,password});
};
const sendVerificationCode = (email, isInsti)=>{
	return post(`${serverURL}/auth/student/${isInsti?'insti-':''}email/verification-code/send`,{email});
};

const checkCode = async(email, verificationCode, isInsti)=>{
	return post(`${serverURL}/auth/student/${isInsti?'insti-':''}email/verification-code/${isInsti?'verify':'check'}`,{email, verificationCode});
};

const registerStudent = async (values)=>{
	return post(`${serverURL}/auth/student/register`,values);
};

const checkFormAccess = async ()=>{
	return get(`${serverURL}/form/access`);
};

export {
	loginSubmit,
	sendVerificationCode,
	checkCode,
	registerStudent,
	checkFormAccess
};