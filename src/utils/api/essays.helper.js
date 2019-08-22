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

const sendSOPToMentors = async (docLink) => {
	return post(`${serverURL}/essays/mentors/sop/send`,{ docLink });
};

const sendCommunityToMentors = async (docLink) => {
	return post(`${serverURL}/essays/mentors/community/send`,{ docLink });
};

const sendSocietyToMentors = async (docLink) => {
	return post(`${serverURL}/essays/mentors/society/send`,{ docLink });
};

const uploadFinalSOP = async (file) => {
	const formData = new FormData();
	formData.append('finalSOP', file);
	return post(`${serverURL}/essays/final/sop/upload`, formData, config);
};

const uploadFinalCommunity = async (file) => {
	const formData = new FormData();
	formData.append('finalCommunity', file);
	return post(`${serverURL}/essays/final/community/upload`, formData, config);
};

const uploadFinalSociety = async (file) => {
	const formData = new FormData();
	formData.append('finalSociety', file);
	return post(`${serverURL}/essays/final/society/upload`, formData, config);
};

const viewFinalEssays = async () => {
	return get(`${serverURL}/essays/final/view/all`);
};

export {
	sendSOPToMentors,
	sendCommunityToMentors,
	sendSocietyToMentors,
	uploadFinalSOP,
	uploadFinalCommunity,
	uploadFinalSociety,
	viewFinalEssays
};