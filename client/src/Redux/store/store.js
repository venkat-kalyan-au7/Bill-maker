import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../_reducers'
import promise from "redux-promise"



const middleware = [thunk,promise];

const store = createStore(
    rootReducer,
   
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;