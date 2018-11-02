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

export default store;