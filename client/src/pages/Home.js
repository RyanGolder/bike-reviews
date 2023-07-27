import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useQuery } from "@apollo/client";

import ReviewList from "../components/ReviewList";
import ReviewForm from "../components/ReviewForm";

import { QUERY_REVIEWS } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_REVIEWS);
  const reviews = data?.reviews || [];

  return (
    <Container className="my-5 bg-dark text-light">
      <Row>
        <Col md={8}>
          <h1>Welcome to Bike Reviews</h1>
          <p>
            Share your review of your road, gravel, and/or mountain bike
            with the cycling community!
          </p>
          <ReviewForm />
        </Col>
        <Col md={4}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <h2>Latest Reviews from the Community:</h2>
              <ReviewList reviews={reviews}/>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;