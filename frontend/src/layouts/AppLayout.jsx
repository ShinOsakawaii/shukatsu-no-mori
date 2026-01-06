
import React from 'react';
import { Outlet } from 'react-router';
import NavBar from './NavBar';

function AppLayout() {
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
