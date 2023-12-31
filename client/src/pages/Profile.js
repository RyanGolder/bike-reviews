import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Container, Row, Col } from "react-bootstrap";

import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";

import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

import { useEffect } from "react";

const Profile = () => {
  // const { username: userParam } = useParams();
  const userParam = Auth.getUsernameFromToken();
  useEffect(() => {
    console.log(userParam);
    }, []);

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }


  if (!loading) {
     return (
    <Container>
      <Row className="justify-content-center mb-3">
        <Col xs={12} md={8} className="bg-dark text-light mb-3">
          <h2>Viewing {userParam ? `${user.username}'s` : "your"} reviews.</h2>
        </Col>

        <Col xs={12} md={10} className="bg-dark text-light">
          <ReviewList
            reviews={user.reviews}
            title={`${user.username}'s reviews...`}
            showTitle={false}
            showUsername={false}
          />
        </Col>

        {!userParam && (
          <Col xs={12} md={8} className="bg-dark text-light">
            <ReviewForm />
          </Col>
        )}
      </Row>
    </Container>
  );}
};

export default Profile;
