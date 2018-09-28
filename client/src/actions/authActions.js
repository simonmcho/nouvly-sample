import { TEST_DISPATCH } from './types';

// Register
export const registerUser = userData => {
    console.log("REGISTER USER ACTION CALLED")
    return {
        type: TEST_DISPATCH,
        payload: userData
    };
};