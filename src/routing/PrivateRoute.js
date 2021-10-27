import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useData } from "../providers/DataProvider";

const PrivateRoute = ({component: Component, ...rest}) => {

    const { data, setData } = useData();
    const token = data.token;

    return (

        <Route {...rest} render={props => (
            token !== "" ? <Component {...props} /> : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;