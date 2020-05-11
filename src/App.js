import React, {Suspense, lazy} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import {ApolloProvider} from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import {useSelector} from 'react-redux';

import history from './history';
import Notfound from './shared/components/not-found';
const HomeComponent = lazy(() => import('./authenticated/home'));
const LoginComponent = lazy(() => import('./anoymous/login'));
const RegisterComponent = lazy(() => import('./anoymous/register'));

function App() {
    const client = new ApolloClient({
        uri: `${process.env.REACT_APP_GRAPH_QL_URL}`,
    });

    const stateData = useSelector(state => state.authentication.toJS());
    const access_token = localStorage.getItem('access_token');

    if (!access_token) {
        return (
            <div className="app">
                <ApolloProvider client={client}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Router history={history}>
                            <Switch>
                                <Route path="/" component={LoginComponent} />
                            </Switch>
                        </Router>
                    </Suspense>
                </ApolloProvider>
            </div>
        );
    }

    return (
        <div className="app">
            <ApolloProvider client={client}>
                <Suspense fallback={<div>Loading...</div>}>
                    <Router history={history}>
                        <Switch>
                            <Route exact path="/" component={HomeComponent} />
                            <Route path="/login" component={LoginComponent} />
                            <Route path="/register" component={RegisterComponent} />
                            <Route component={Notfound} />
                        </Switch>
                    </Router>
                </Suspense>
            </ApolloProvider>
        </div>
    );
}

export default App;
