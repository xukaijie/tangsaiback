import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import productList from '../reducer/productList.jsx';

//创建一个 Redux store 来以存放应用中所有的 state，应用中应有且仅有一个 store。

let store = createStore(
    combineReducers({
        productList
    }),
    applyMiddleware(thunk)
);

export default store;