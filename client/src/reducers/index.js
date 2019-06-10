import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import alertReducer from './alertReducer';

// This allows us to combine a bunch of reducers and export combineReducers
// This essentially will be a representation of the application state's key value pairs.
export default combineReducers({
    auth: authReducer, // when we use anything from authReducer in our components, we can use this.props.auth
    errors: errorReducer,
    alert: alertReducers
});
