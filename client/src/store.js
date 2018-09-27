import { createStore, applyMiddleware } from 'redux'; 
import thunk from 'redux-thunk';

const middleware = [thunk];

const store = createStore(() => [], {}, applyMiddleware(...middleware)); // spread operator allows us to bring any middleware in the variable declartion

export default store;