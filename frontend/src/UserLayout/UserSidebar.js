import React from 'react';

import { Link } from 'react-router-dom';
const userNavigation = [
    {
        title: "Profile",
        href: "/user-profile",
    },
    {
        title: "AllOrders",
        href: "/user-profile/user-allorder",
    },
    {
        title: "Refunds",
        href: "#",
    },
    {
        title: "Inbox",
        href: "/user-profile/chatbox",
    },
    {
        title: "Track Order",
        href: "#",
    },
    {
        title: "Change Password",
        href: "#",
    },
    {
        title: "Address",
        href: "/user-profile/address",
    },

];


const UserSidebar = () => {


    return userNavigation.map((item) => {

        return (<>
            <div style={{color:'#fff' , padding:'0% 0% 8% 6% '}}>
                <Link to={item.href} style={{color:'#fff' , textDecoration:'none',textTransform:'capitalize' }}>{item.title}</Link>

            </div>
        </>)
    })



}

export default UserSidebar