import React, { useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile} from 'firebase/auth';
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const Register = () => {

    // const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');



    const handleEmailChange = (event) => {
        // console.log(event.target.value);
        // setEmail(event.target.value);
    }

    const handlePasswordBlur = (event) => {

        // console.log(event.target.value);

    }

    const handleSubmit = (event) => {

        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const name = event.target.name.value;

        //password validation with regEx

        if(!/(?=.*[A-Z])/.test(password)){
            setError('Please add atleast one uppercase');
            return;
        }
        else if(!/(?=.*[0-9].*[0-9])/.test(password)){
            setError('Please add atleast two digit');
            return;
        }
        else if(password.length<6){
            setError('Please add atleast 6 characters');
            return;
        }

        // event.target.reset();

        // event.target.email.value = '';
        // event.target.password.value = '';
        // console.log('email: '+email +'  '+'password: '+password);
        //create user on firebase

        createUserWithEmailAndPassword(auth, email, password)
        .then( result =>{
            const loggedUser = result.user;
            event.target.reset();
            console.log(loggedUser);
            setSuccess('User seccessfully created');
            setError('');
            sendVerificationEmail(result.user);
            updateUserData(result.user, name);
        })
        .catch(error =>{
            console.error(error.message);
            setError(error.message);
        })
    }

    const sendVerificationEmail = (user) =>{
        sendEmailVerification(user)
        .then(result=>{
            console.log(result);
            alert('Please verify your email address.')
        })
    }

    const updateUserData = (user, name) =>{

        updateProfile(user, {
            displayName: name
        })
        .then(()=>{
            console.log('User name updated')
        })
        .catch(error=>{
            console.log(error.message);
        })
    }

    return (
        <div className='w-50 mx-auto'>
            <h4>Please Register..</h4>
            <form onSubmit={handleSubmit}>
                <input className='w-100 mb-4 rounded ps-2' type="text" name='name' id='name' placeholder='Your Name' required/>
                <br />
                <input className='w-100 mb-4 rounded ps-2' onChange={handleEmailChange} type="email" name='email' id='email' placeholder='Enter email' required/>
                <br />
                <input className='w-100 mb-4 rounded ps-2' onBlur={handlePasswordBlur} type="password" name="password" id="password" placeholder='Enter password' required/>
                <br />
                <p><small>Already have an account? Please <Link to='/login'>Login</Link></small></p>
                {/* error message */}
                <p className='text-danger'>{error}</p>
                <p className='text-success'>{success}</p>
                <input className='btn btn-primary' type="submit" value="register" />
            </form>
        </div>
    );
};

export default Register;