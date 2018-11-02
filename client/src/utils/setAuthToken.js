import axios from 'axios';

const setAuthToken = token  => {
    // Apply to every request if it exists, else delete auth header
    token 
    ? axios.defaults.headers.common['Authorization'] = token
    : delete axios.defaults.headers.common['Authoriation'];
}

export default setAuthToken;