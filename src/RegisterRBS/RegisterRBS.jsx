import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const RegisterRBS = () => {

    const handleRegister = (event) =>{

        event.preventDefault();
        // console.log(event.target.email.value);
        const email = event.target.email.value;
        const password = event.target.password.value;

        console.log('email: '+email+'  '+'password: '+password);
    }

    return (
        <div className='mt-5 p-5 border border-info'>
            <h3 className='text-success'>Please, You are requested to Register...</h3>
            <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className='fw-semibold'>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className='fw-semibold'>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Accept Terms & Conditions." />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>

    );
};

export default RegisterRBS;