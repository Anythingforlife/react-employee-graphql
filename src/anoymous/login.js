import React, {useState} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Form, Label, FormGroup, Input, FormText, Button} from 'reactstrap';
import {Link, Redirect} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux';
import {authenticateUser} from '../actions/authentication';
import {gql} from 'apollo-boost';
import {GraphQLObjectType} from 'graphql';
import {useQuery, useMutation} from '@apollo/react-hooks';

const LOGIN = gql`
    mutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            firstName
            lastName
            email
        }
    }
`;

function Login() {
    const [componentState] = useState({credentials: {email: 'om@g.com', password: 'omprakash', isLogin: false}});
    const [login, data] = useMutation(LOGIN);
    const dispatch = useDispatch();
    const stateData = useSelector(state => state.authentication.toJS());

    if (stateData.isLogin) {
        return <Redirect to="/" />;
    }

    return (
        <div className="jumbotron">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 offset-sm-3">
                        {/* FORMIK */}
                        <Formik
                            initialValues={componentState.credentials}
                            validationSchema={Yup.object().shape({
                                email: Yup.string().email().required('Required'),
                                password: Yup.string().required('Password is required'),
                            })}
                            onSubmit={values => {
                                dispatch(authenticateUser(values, login));
                            }}
                            render={({touched, errors, values, handleChange, handleBlur, handleSubmit, isValid}) => (
                                <Form onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <Label>Email*</Label>
                                        <Input
                                            invalid={touched.email && errors.email != null}
                                            valid={touched.email && errors.email == null}
                                            id="email"
                                            type="text"
                                            placeholder="Email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {touched.email && <FormText color="danger">{errors.email}</FormText>}
                                    </FormGroup>

                                    <FormGroup>
                                        <Label>Password*</Label>
                                        <Input
                                            invalid={touched.password && errors.password != null}
                                            valid={touched.password && errors.password == null}
                                            id="password"
                                            type="password"
                                            placeholder="Password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {touched.password && <FormText color="danger">{errors.password}</FormText>}
                                    </FormGroup>
                                    <Button color="primary" type="submit" disabled={!isValid}>
                                        Submit
                                    </Button>
                                    <Link to="/register" className="ml-2">
                                        New user
                                    </Link>
                                </Form>
                            )}
                        />
                        {/* END OF FORMIK */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
