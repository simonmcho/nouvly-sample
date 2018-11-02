import { TEST_DISPATCH, SET_CURRENT_USER } from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
    isAuthenticated: false,
    user: {}
    // Can add any key value pair, this will show up in your auth state object
}

export default (state = initialState, action) => {
    switch (action.type) {
        case TEST_DISPATCH:
            return {
                ...state, 
                user: action.payload
            }
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        default:
            return state;
    }
}