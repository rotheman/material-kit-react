import React from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { useAppContext } from 'src/lib/contextLib';


export default function PrivateRoute(){
    const { isAuthenticated } = useAppContext();
    //this is used for the initial navigation to /dashboard after logging in
    const { checkin } = useAppContext();

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return isAuthenticated || checkin ? <Outlet /> : <Navigate to={"/login"}/>;
}