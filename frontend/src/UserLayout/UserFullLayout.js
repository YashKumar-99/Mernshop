import React from 'react';
import UserSidebar from './UserSidebar';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const UserFullLayout = () => {
    return (
        <>
            {/* <Header/> */}
            <div style={{ display: 'flex', height: '100vh' }}>
                <div style={{ flex: '0 0 12%', background: '#0e0e0e', display: 'flex', flexDirection: 'column', paddingTop: '30px' }}>
                    <UserSidebar />
                </div>
                <div style={{ flex: '1', margin: '10px', padding: '10px', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px' }}>
                    <Outlet />
                </div>

            </div>

        </>
    )
}

export default UserFullLayout