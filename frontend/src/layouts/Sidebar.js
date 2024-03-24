import React from 'react';
import { Link, Outlet } from 'react-router-dom';


const sellerNavigation = [
    {
        title: "Dashboard",
        href: "/seller-dashboard",
    },
    {
        title: "AllOrders",
        href: "/seller-dashboard/allorders",
    },
    {
        title: "CreateProducts",
        href: "/seller-dashboard/createproducts",
    },
    {
        title: "inbox",
        href: "/seller-dashboard/inbox",
    },
    {
        title: "Buttons",
        href: "#",
    },
    {
        title: "Cards",
        href: "#",
    },
    {
        title: "Grid",
        href: "#",
    },
    {
        title: "Table",
        href: "#",
    },
    {
        title: "Forms",
        href: "#",
    },
    {
        title: "Breadcrumbs",
        href: "#",
    },
    {
        title: "About",
        href: "#",
    },
];





const Sidebar = () => {







    return (
        <>

            {
                sellerNavigation?.map((menuLink) => {

                    return (
                        <div>


                            <Link to={menuLink.href}>

                                {menuLink.title}

                            </Link>


                        </div>
                    )

                })
            }

        </>
    )
}

export default Sidebar