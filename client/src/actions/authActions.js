import axios from 'axios';
import { TEST_DISPATCH, GET_ERRORS } from './types';

// Register
export const registerUser = (userData, history) => dispatch => {
    
    axios
        .post('/api/users/register', userData)
        .then(res=> {
            console.log(res.data);
        })
        .catch(err => {
            const errors = err.response.data;

            dispatch({
                type: GET_ERRORS,
                payload: errors
            });
            
        });

    // // Register user
    // axios.post('/api/users/register', userData)
    //     .then(res => {
    //         //console.log(res.data); // this should be userData, the 2nd param in axios.post
    //         history.push('/login');
    //     })
    //     .catch(err => {
    //         const errors = err.response.data;
            
    //         dispatch({ // dispatch sends this information to the store
    //             type: GET_ERRORS,
    //             payload: errors     
    //         });

    //     });
    // return { // If no async 
    //     type: TEST_DISPATCH, //action.type
    //     payload: userData // action.userData
    // };
};