import React from 'react';
import {gql} from 'apollo-boost';
import {useQuery} from '@apollo/react-hooks';
import Header from '../shared/components/Header';

const GET_EMPLOYEE_LIST = gql`
    query($currentPage: Int!, $perPage: Int!) {
        getEmployees(currentPage: $currentPage, perPage: $perPage) {
            total
            data {
                id
                employee_name
                employee_salary
                employee_age
            }
        }
    }
`;

export default function EmployeeList() {
    const {loading, data, error} = useQuery(GET_EMPLOYEE_LIST, {variables: {currentPage: 1, perPage: 10}});

    if (loading) {
        console.log('one');
        return <div>Loading...</div>;
    }

    if (error) {
        console.log('error', error.message);
    }

    if (data) {
        return (
            <div>
                {console.log('three')}
                <Header />
                <div className="container mt 4">
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Salary</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.getEmployees.data.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <th>{item.id}</th>
                                        <td>{item.employee_name}</td>
                                        <td>{item.employee_age}</td>
                                        <td>{item.employee_salary}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
