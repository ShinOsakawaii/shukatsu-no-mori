import React from 'react';
import { Outlet } from 'react-router';

function AppLayout(props) {
    return (
        <>
            <Outlet />
        </>
    );
}

export default AppLayout;