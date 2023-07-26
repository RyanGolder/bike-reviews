import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import { ADD_REVIEW } from "../../utils/mutation";
import { QUERY_REVIEWS, QUERY_ME } from "../../utils/queries";

import Auth from "../../utils/auth";

const ReviewForm = () => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("");
  const [bike, setBike] = useState("");

  const [addReview, { error }] = useMutation(ADD_REVIEW, {
    update(cache, { data: { addReview } }) {
      try {
        const { reviews } = cache.readQuery({ query: QUERY_REVIEWS });

        cache.writeQuery({
          query: QUERY_REVIEWS,
          data: { reviews: [addReview, ...reviews] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache, appending new review to the end of the array
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, reviews: [...me.reviews, addReview] } },
      });
    },
    refetchQueries: [{ query: QUERY_REVIEWS }],
    onError: (error) => {
      console.log(error);
    }
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log(`reviewText: ${reviewText}, rating: ${rating}, bike: ${bike}`)
      // add review to database
      const { data } = await addReview({
        variables: {
          reviewText,
          rating: parseInt(rating),
          bike,
        },
        update(cache, { data: { addReview } }) {
          let data;

          try {
            data = cache.readQuery({ query: QUERY_REVIEWS });
            if (data) {
              const { reviews } = data;
              cache.writeQuery({
                query: QUERY_REVIEWS,
                data: { reviews: [addReview, ...reviews] },
              });
            }
        } catch (e) {
          console.error(e);
        }

        // update me object's cache, appending new review to the end of the array
        try {
          data = cache.readQuery({ query: QUERY_ME });
          if (data) {
            const { me } = data;
            cache.writeQuery({
              query: QUERY_ME,
              data: { me: { ...me, reviews: [...me.reviews, addReview] } },
            });
          }
        } catch (e) {
          console.error(e);
        }
      },
      });

      // clear form value
      setReviewText("");
      setBike("");
      setRating("");
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "reviewText" && value.length <= 280) {
      setReviewText(value);
    } else if (name === "bike") {
      setBike(value);
    } else if (name === "rating") {
      setRating(value);
    }
  };

  return (
    <div>
      <h3>Leave a review of a bike here!</h3>
      {Auth.loggedIn() ? (
        <>
          <Form onSubmit={handleFormSubmit} className="bg-dark text-light p-4">
            <Form.Group controlId="formReviewText">
              <Form.Label>Leave a review:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="reviewText"
                placeholder="Leave a review here!"
                value={reviewText}
                onChange={handleChange}
                style={{ height: "200px" }}
              />
            </Form.Group>
            {/* <Form.Group controlId="formBike">
              <Form.Label>Bike Brand, model and year:</Form.Label>
              <Form.Control
                type="text"
                name="bike"
                value={bike}
                onChange={handleChange}
                placeholder="Bike Brand, model and year"
              />
            </Form.Group>
            <Form.Group controlId="formRating">
              <Form.Label>Rating out of 5:</Form.Label>
              <Form.Control
                type="number"
                min={1}
                max={5}
                name="rating"
                value={rating}
                onChange={handleChange}
                placeholder="Rating out of 5"
              />
            </Form.Group> */}
            <Button disabled={!reviewText} type="submit" variant="success">
              Submit
            </Button>
          </Form>
        </>
      ) : (
        <p>
          You need to be logged in to leave a bike review. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default ReviewForm;
