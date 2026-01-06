
import React from 'react';
import { Outlet } from 'react-router';
<<<<<<< HEAD
=======
import NavBar from './NavBar';
>>>>>>> 5bd39c53caa26aa73c7373d75709f4a94147e94f

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
