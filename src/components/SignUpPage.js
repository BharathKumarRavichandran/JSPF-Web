import React,{useState} from 'react';
import SignUpForm from './SignupForm';
import EmailVerify from './EmailVerify';
export default function SignUpPage(){
	const [emailVerified, setEmailVerified] = useState(false);
	const [email, setEmail] = useState();
	const [verificationCode, setVerificationCode] = useState();

	return(
		emailVerified?<SignUpForm verificationCode={verificationCode} email={email}/>:<EmailVerify setEmailVerified={setEmailVerified} setVerificationCode={setVerificationCode} setEmail={setEmail}/>
	);
}