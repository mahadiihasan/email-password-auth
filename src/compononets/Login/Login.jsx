import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';


const auth = getAuth(app);

const Login = () => {

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef();

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        console.log(email, password);

        //validation

        setError('');
        setSuccess('');

        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setError('Please add atleast two uppercase. ');
            return;
        }
        else if (!/(?=.*[!@#$%^&*])/.test(password)) {
            setError('Please add atleast one special character');
            return;
        }
        else if (password.length < 6) {
            setError('Password must be in 6 characters');
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                setSuccess('User login successful.');
                setError('');
            })
            .catch(error => {
                setError(error.message);
            })

    }

    //reset password

    const handleResetPassword = event => {
        const email = emailRef.current.value;
        if (!email) {
            alert('Please provide your email address to reset password.')
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent!
                alert('Please check your email.');
                // ..
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
                // ..
            });
    }



    return (
        <div className='w-50 mx-auto'>
            <h5 className='text-success mt-3 mb-3'>Please, You are requested to Login..</h5>
            <Form onSubmit={handleLogin}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' ref={emailRef} placeholder="Enter email" required />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" required />
                </Form.Group>

                <Form.Group className='m-2 ms-0' controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Remember Me" />
                </Form.Group>

                <Button className='mt-2' variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            <p><small>Forget password? Please <button onClick={handleResetPassword} className='btn btn-link'>reset password</button></small></p>
            <p><small>New to this website? Please <Link to='/register'>Register</Link></small></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Login;