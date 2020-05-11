import {combineReducers} from 'redux';
import authentication from './reducers/authentication';

const appReducer = combineReducers({
    authentication,
});

const rootReducer = (state, action) => {
    if (action.type === 'CLEAR_REDUX_STORE') {
        state = undefined;
    }

    return appReducer(state, action);
};

export default rootReducer;
