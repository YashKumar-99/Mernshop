import React, { useEffect, useState } from 'react'
import { Routes, Route, Outlet } from 'react-router-dom';


import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { fetchAuthSeller } from '../../../redux/features/sellerAuth';
import Cookies from 'js-cookie';


const SellerDashboard = () => {

  const [shopName, setShopName] = useState('');


  async function hello() {
    await axios.get('/seller/getseller').then((res) => {

      if (res.status === 201) {
        setShopName(res.data.findseller.name)
      }
    }).catch((err) => {
      console.log(err);
    });
  }


  const reduxDispatch = useDispatch();
  const accessTokenID = Cookies.get('accessTokenID');


  async function callfun() {
    await reduxDispatch(fetchAuthSeller());
    const accessTokenIDa = Cookies.get('accessTokenID');
    console.log(accessTokenIDa, "aaaa");
  }

  if (!accessTokenID) {
    callfun();
  }




  useEffect(() => {
    console.log("called !")
    hello();
  }, []);

  return (

    <>
      <div>SellerDashboard



        <p>sellerName:{shopName}</p>
      </div>
      <Outlet />
    </>

  )
}

export default SellerDashboard