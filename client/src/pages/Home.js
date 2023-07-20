import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useQuery } from '@apollo/client';

import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';

import { QUERY_REVIEWS } from '../utils/queries';

const Home = () => {
    const { loading, data } = useQuery(QUERY_REVIEWS);
    const reviews = data?.reviews || [];

    return (
        <Container className="my-5">
            <Row>
                <Col md={8}>
                    <h1 className='text-light'>Welcome to Bike Reviews</h1>
                    <p className='text-light'>
                        Share your thoughts and reviews on road, gravel, and mountain bikes with the cycling community!
                    </p>
                    <ReviewForm />
                </Col>
                <Col md={4}>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <>
                        <h2 className='text-light'>Latest Reviews from the Community</h2>
                        <ReviewList reviews={reviews} title="Reviews on Bikes!" />
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Home;