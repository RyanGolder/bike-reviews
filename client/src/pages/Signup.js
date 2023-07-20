import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { link } from 'react-router-dom';

import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Signup = () => {
    const [formState, setFormState] = useState({ username: '', email: '', password: '' });
    const [addUser, { error }] = useMutation(ADD_USER);
    const { loading, data } = useQuery(ADD_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {
            const { data } = await addUser({
                variables: { ...formState },
            });
            Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
        console.log(formState);
    };

    return (
        <div className='bg-dark text-light p-4'>
            <h2>Sign Up</h2>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        placeholder="Enter username"
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email address:</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        onChange={handleChange}
                    />
                </Form.Group>
                {error ? (
                    <Alert dismissible variant="danger">
                        {error.message}
                    </Alert>
                ) : null}
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    {data?.users.map((user) => (
                        <div key={user._id}>
                            <p>{user.username}</p>
                            <p>{user.email}</p>
                        </div>
                    ))}
                </div>
            )}
            {error && <div className='my-3 p-3 bg-danger text-white'>{error.message}</div>}
            {data && data.addUser && (
                <div className='my-3 p-3 bg-success text-white'>
                    Success! You may now head{' '}
                    <Link to='/login'>back to the login page.</Link>
                </div>
            )}

            <div className='my-3 p-3'>
                Already have an account?{' '}
                <Link to='/login'>Login here</Link>
                .
            </div>
        </div>
    );
}