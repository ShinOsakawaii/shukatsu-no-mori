import React from 'react';
import { Outlet } from 'react-router';

function AppLayout(props) {
    return (
        <div>
            <Outlet />
        </div>
    );
}

export default AppLayout;
