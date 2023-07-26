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
        <Col>
          <h1>Welcome to Bike Reviews</h1>
          <p>
            Share your thoughts and reviews on road, gravel, and mountain bikes
            with the cycling community!
          </p>
          <ReviewForm />
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <h2>Latest Reviews from the Community</h2>
              <ReviewList reviews={reviews} title="Reviews on Bikes!" />
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
