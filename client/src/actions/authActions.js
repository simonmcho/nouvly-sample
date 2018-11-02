import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

import { TEST_DISPATCH, GET_ERRORS, SET_CURRENT_USER } from './types';

// Register
export const registerUser = (userData, history) => dispatch => {
    console.log(dispatch);
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
export const loginUser = userData => dispatch => {
    axios
        .post('/api/users/login', userData)
        .then(res => {
            const { token } = res.data; // Save to localStorage

            localStorage.setItem('jwtToken', token); // Set token to localStorage - Only stores strings
            setAuthToken(token);

            const decoded = jwt_decode(token); // Decode token to get user data

            dispatch(setCurrentUser(decoded));
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}