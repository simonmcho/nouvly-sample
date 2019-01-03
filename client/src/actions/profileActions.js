import axios from 'axios';

import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from './types';
// Action that hits the api/profile endpoint. This will get the profile of the token that was retrieved upon login

// Get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());

    axios.get('/api/profile')
        .then(res => 
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({ 
                type: GET_PROFILE,
                payload: {} // Payload will be empty if profile does not exist in the db
            })    
        )
}

// Profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}

// Clear Profile
export const clearProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}
