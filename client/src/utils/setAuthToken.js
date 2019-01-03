import axios from 'axios';

// Apply to every request if it exists, else delete auth header
const setAuthToken = token  => {
    
    token 
    ? axios.defaults.headers.common['Authorization'] = token // Sets token to default header's Authoriation key value for all requests
    : delete axios.defaults.headers.common['Authoriation'];
}

export default setAuthToken;