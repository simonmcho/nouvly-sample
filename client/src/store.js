import { createStore, applyMiddleware, compose } from 'redux'; 
import thunk from 'redux-thunk';
import rootReducer from './reducers'; // import combined reducer

const initialState = {};

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // Allows redux devtools chrome extension
    )
);
//const store = createStore(rootReducer, initialState, applyMiddleware(...middleware)); // spread operator allows us to bring any middleware in the variable declartion
//const store = createStore(() => [], {}, applyMiddleware(...middleware));
console.log("BELOW IS THE STORE!!!!")
console.log(store);
export default store;