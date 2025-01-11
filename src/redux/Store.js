import { applyMiddleware, createStore } from 'redux';
import {thunk} from 'redux-thunk';
import Reducers from './Reducers';

const Store = createStore(Reducers , applyMiddleware(thunk));

Store.subscribe(()=> {
    // console.log('Store updated', Store.getState());
});
export default Store ;
