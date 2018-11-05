import axios from 'axios';

import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS } from './types';
// Action that hits the api/profile endpoint. This will get the profile of the token that was retrieved upon login

// Get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
}

// Profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
}
