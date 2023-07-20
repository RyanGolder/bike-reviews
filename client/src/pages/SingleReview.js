import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Card, Badge } from "react-bootstrap";

import { QUERY_SINGLE_REVIEW } from "../utils/queries";

const SingleReview = () => {
  const { id: reviewId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_REVIEW, {
    variables: { id: reviewId },
  });

  const review = data?.review || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="my-3">
      <Card bg="dark" text="light">
        <Card.Header>
          {review.reviewAuthor} <br />
          <span style={{ fontSize: "1rem" }}>
            posted this review on {review.createdAt}
          </span>
        </Card.Header>
        <Card.Body className="bg-dark text-light">
          <blockquote
            className="p-4"
            style={{
              fontSize: "1.5rem",
              fontStyle: "italic",
              border: "2px dotted #1a1a1a",
              lineHeight: "1.5",
            }}
          >
            {review.reviewText}
          </blockquote>
        </Card.Body>
        <div className="my-2">
          <Badge variant="secondary">{review.rating}/5</Badge>
        </div>
      </Card>
    </div>
  );
};

export default SingleReview;
