import './App.css';
import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SingupPage, LoginPage, ActivationPage, Dashboard, SellerLogin, SellerRegister, SellerDashboard ,Product} from './routes/Routes';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import { fatchAuthUser } from './redux/features/userSlice'
import { useSelector, useDispatch } from 'react-redux';


import AllOrders from './seller/comp/views/AllOrders';
import CreateProduct from './seller/comp/views/CreateProduct';
import SellerDashboardTest from './seller/comp/views/SellerDashboard';
import FullLayout from './layouts/FullLayout';
import InboxChat from './chat/InboxChat';
import UserFullLayout from './UserLayout/UserFullLayout';
import Profile from './UserLayout/views/Profile';
import Address from './UserLayout/views/Address'
import AllUserOrders from './UserLayout/views/Allorder';
import ChatBox from './UserLayout/views/ChatBox'
import ChatBoxSec from './UserLayout/views/ChatBoxSec';

import Sidebar from './layouts/Sidebar';


import Chat from './components/Chat';


import { useRef } from 'react';
import io from 'socket.io-client';
const ENDPOINT = 'http://localhost:4000/';


function App() {


  // var socket = useRef(null);

  // useEffect(()=>{
  //   socket.current = io(ENDPOINT);
  //  alert("hello") 
  // },[])




  // useEffect(() => {
  //   socket.current = io(ENDPOINT);

  //   socket.current.on('connect', () => {
  //     console.log('Connected to socket server');
  //   });

  //   socket.current.on('error', (error) => {
  //     console.error('Socket connection error:', error);
  //   });

  //   socket.current.on('message', (data) => {
  //     alert('New message received'); // Add an alert for testing
  //     console.log('Received new message:', data);
  //     // dispatch(incrementCount({ amount: 1 })); // Dispatch action to increment count
  //   });

  //   return () => {
  //     socket.current.disconnect();
  //   };
  // }, [socket]);










  const dispatch = useDispatch()
  // const [userState, setUserStatus] = useState(null);


  // const Navigate = useNavigate();


  // useEffect(() => {

  //   // function getCookie(name) {
  //   //   const value = `; ${document.cookie}`;
  //   //   const parts = value.split(`; ${name}=`);
  //   //   if (parts.length === 2) return parts.pop().split(';').shift();
  //   // }

  //   // const token = getCookie('token');
  //   // console.log(token,"tooto")

  //   // const token = Cookies.get('token');
  //   // console.log(token, "check boss..!!")

  //   console.log("calling")

  //   axios.get('/user/authentication').then((res) => {


  //     if (res.data.auth) {
  //       setUserStatus(res.data.auth)

  //     } else {
  //       setUserStatus(false)
  //     }
  //   }).catch((err) => {
  //     setUserStatus(false)


  //   })




  // }, [userState])


  // useEffect(() => {

  //   if (userState) {
  //     Navigate('/')
  //   } else {
  //     Navigate('/login')
  //   }
  // }, [userState])

  const { authUser } = useSelector((store) => store);
  // console.log(authUser, "dd")


  useEffect(() => {
    dispatch(fatchAuthUser())


  }, [authUser.authUser])


  // useEffect(() => {

  //   console.log('hewy')
  // }, [])





  return (
    <>


      {/* <button onClick={() => dispatch(fatchAuthUser())}>ddfd</button> */}

      <Routes>
        <Route path='/' element={<Dashboard />} />
        {/* <Route path="/chat" element={<Chat />} />

        <Route path="/inbox" element={<Chat />} /> */}


        <Route path="/converstion" element={<Chat />} />

        <Route exact path="/register" element={<SingupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/activation/:activation_token' element={<ActivationPage />} />

        <Route path="/create-shop" element={<SellerRegister />} />
        <Route path="/login-shop" element={<LoginPage />} />
        <Route path="/products" element={<Product />} />
        {/* <Route path="/seller-dashboard" element={<SellerDashboard />} /> */}

        <Route path="/seller-dashboard" element={<FullLayout />} >
          <Route path="/seller-dashboard" element={<SellerDashboardTest />} />

          <Route exact path="/seller-dashboard/allorders" element={<AllOrders />} />
          <Route exact path="/seller-dashboard/createproducts" element={<CreateProduct />} />
          <Route exact path="/seller-dashboard/inbox" element={<ChatBoxSec />} />



        </Route>

        <Route path="/user-profile" element={<UserFullLayout />} >
          <Route path="/user-profile" element={<Profile />} />
          <Route path="/user-profile/user-allorder" element={<AllUserOrders />} />
          <Route path="/user-profile/chatbox" element={<InboxChat />} />
          <Route path="/user-profile/address" element={<Address />} />
        </Route>

      </Routes>


      <ToastContainer position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />


    </>




  );
}

export default App;
