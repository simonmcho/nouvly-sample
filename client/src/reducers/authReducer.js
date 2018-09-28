import { TEST_DISPATCH } from '../actions/types';

const initialState = {
    isAuthenticated: false,
    user: {}
    // Can add any key value pair, this will show up in your auth state object
}

export default (state = initialState, action) => {
    console.log("AUTH REDUCER CALLED");
    console.log("THE AUTH REDUCER CURRENT STATE IS " + state);
    console.log("AND THE ACTION IS");
    console.log(action);
    switch (action.type) {
        case TEST_DISPATCH:
            return {
                ...state, 
                user: action.payload
            }
        default:
            return state;
    }
}