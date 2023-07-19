import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password){
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password){
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_REVIEW = gql`
    mutation addReview($reviewText: String!, $reviewAuthor: String!) {
        addReview(reviewText: $reviewText, reviewAuthor: $reviewAuthor){
            _id
            reviewText
            reviewAuthor
            createdAt
        }
    }
`;

export const REMOVE_REVIEW = gql`
    mutation removeReview($reviewId: ID!) {
        removeReview(reviewId: $reviewId){
            _id
            reviewText
            reviewAuthor
            createdAt
        }
    }
`;
