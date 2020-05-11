import {fromJS} from 'immutable';

const initialState = fromJS({
    email: '',
    password: '',
    isLogin: false,
    users: null,
    error: '',
});

export default (state = initialState, action) => {
    switch (action.type) {
        case 'AUTHENTICATING_INITIALIZED':
            return state.merge({email: action.payload.email, password: action.payload.password});
        case 'AUTHENTICATING_SUCCEEDED':
            return state.merge({isLogin: true, users: action.payload.users});
        case 'AUTHENTICATING_FAILED':
            return state.merge({isLogin: false, error: action.payload.error, users: null});
        default:
            return state;
    }
    
};
