import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useData } from "../providers/DataProvider";

const PublicRoute = ({component: Component, restricted, ...rest}) => {

    const { data, setData } = useData();
    const token = data.token;

    return (
        <Route {...rest} render={props => (
            token !== "" && restricted ? <Redirect to="/home" /> : <Component {...props} />
        )} />
    );
};

export default PublicRoute;