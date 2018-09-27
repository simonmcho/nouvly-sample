import { combineReducers } from 'redux';
import authReducer from './authReducer';

// This allows us to combine a bunch of reducers and export combineReducers
export default combineReducers({
    auth: authReducer // when we use anything from authReducer in our components, we can use this.props.auth
});