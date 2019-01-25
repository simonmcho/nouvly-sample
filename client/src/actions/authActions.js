import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

import { GET_ERRORS, SET_CURRENT_USER } from './types';

// Register
export const registerUser = 
    (userData, history) => dispatch => { // Thunk middleware allows us to call registerUser that returns a function, NOT an object
        axios
            .post('/api/users/register', userData)
            .then(res=> {
                history.push('/login');
            })
            .catch(err => {
                
                const errors = err.response.data;

                dispatch({
                    type: GET_ERRORS,
                    payload: errors
                });
                
            });
    };

// Login - Get User Token
export const loginUser = 
    userData => dispatch => {
        axios
            .post('/api/users/login', userData)
            .then(res => {

                const { token } = res.data; // Save to localStorage

                localStorage.setItem('jwtToken', token); // Set token to localStorage - Only stores strings
                setAuthToken(token);

                const decodedObject = jwt_decode(token); // Decode token to get user data

                dispatch(setCurrentUser(decodedObject)); // decodedObject is the User object. 

            })
            .catch(err => dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }));
    }

// Set logged in user
export const setCurrentUser = 
    decodedObject => {
        return {
            type: SET_CURRENT_USER,
            payload: decodedObject // payload is set to the passed in object. The reducer will look at this to set isAuthenticated and User properties of store accordingly
        }
    }

// Log user out
export const logoutUser = () =>
    dispatch => {
        
        localStorage.removeItem('jwtToken'); // Remove token from localStorage
        setAuthToken(false); // Remove auth header for future requests
        dispatch(setCurrentUser({})); // Sert current user to {} which will set isAuthenitcated to false

        // history.push('/login');

    }