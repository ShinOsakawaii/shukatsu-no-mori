import React from 'react';
import { Outlet } from 'react-router';
import NavBar from './NavBar';

function AppLayout(props) {
    return (
        <>
            <NavBar />
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default AppLayout;
