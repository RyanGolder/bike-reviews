import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

import Auth from "../../utils/auth";

const ReviewList = ({
    reviews,
    title,
    showTitle = true,
    showUsername = true,
}) => {
    if (!reviews.length) {
        return <h3>No Reviews Yet</h3>;
    }

    return (
        <>
            {showTitle && <h3>{title}</h3>}
            {reviews.map((review) => (
                <Card key={review.id} className="mb-2 bg-dark text-light">
                    <Card.Body>
                        {showUsername && (
                            <p className="font-weight-bold mb-1">
                                Review by {review.reviewAuthor} on{" "}
                            </p>
                        )}
                        <p className="mb-0">Review: {review.reviewText}</p>
                        <p className="mb-0">Bike: {review.bike}</p>
                        <p className="mb-0">Rating: {review.rating}</p>
                        <p className="mb-0">
                            Created on{" "}
                            {new Date(parseInt(review.createdAt)).toLocaleDateString()}
                        </p>
                        {Auth.loggedIn() && (
                            <Button
                                disabled={!(Auth.loggedIn() && Auth.getProfile().data.username === review.reviewAuthor)}
                                className="btn-block btn-danger"
                                onClick={() => handleDeleteReview(review._id)}
                            >
                                Delete this review
                            </Button>
                        )}
                    </Card.Body>
                </Card>
            ))}
        </>
    );
};

export default ReviewList;