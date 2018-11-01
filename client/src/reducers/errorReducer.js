import { GET_ERRORS } from '../actions/types';

const initialState = {}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ERRORS:
            return action.payload; //payload comes from action
        default:
            return state;
    }
}