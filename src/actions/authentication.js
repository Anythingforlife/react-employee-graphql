export const authenticateUser = (credentials, login) => {
    return dispatch => {
        dispatch({type: 'AUTHENTICATING_INITIALIZED', payload: credentials});
        login({variables: credentials})
            .then(res => {
                console.log(res.data.login.token);
                localStorage.setItem('access_token', res.data.login.token);
                dispatch({type: 'AUTHENTICATING_SUCCEEDED', payload: {users: res.data.login}});
            })
            .catch(err => {
                dispatch({type: 'AUTHENTICATING_FAILED', payload: {error: err.message}});
            });
    };
};
