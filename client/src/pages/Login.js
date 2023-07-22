import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { LOGIN_USER } from '../utils/mutation';

const Login = (props) => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN_USER);

    const handleChange = async (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {
            const { data } = await login({
                variables: { ...formState },
            });

            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }

        setFormState({
            email: '',
            password: '',
        });
    };

    return (
        <div className='bg-dark text-light p-4'>
            <h2 className='mb-4'>Login</h2>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group controlId='formEmail'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={formState.email}
                    onChange={handleChange}
                    name='email'
                    />
                </Form.Group>

                <Form.Group controlId='formPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    type='password'
                    placeholder='Password'
                    value={formState.password}
                    onChange={handleChange}
                    name='password'
                    />
                </Form.Group>

                <Button variant='primary' type='submit'>
                    Login
                </Button>
            </Form>
        </div>
    );
};

export default Login;