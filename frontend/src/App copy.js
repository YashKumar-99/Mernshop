import './App.css';
import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';

import { Routes, Route } from "react-router-dom";


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SingupPage, LoginPage, ActivationPage, HomePage } from './routes/Routes'


import axios from 'axios';

function App() {



  const fetchData = async () => {

    await axios.get('https://jsonplaceholder.typicode.com/todos/1').then((res) => {
      console.log(res, "res is here")
    })

  }

  const [apiData, setApiData] = useState(null);


  // function getData(data)  {

  //   setApiData(data)
  //   console.log(data, "calling the data 1")

  // }

  // console.log(apiData, "calling the data 2")




  function tempfun() {




  }



  function getDataFun(data) {
    console.log(data, "da");
  }




  const [count, setCount] = useState(0);

  const [gettag, setgentag] = useState([])

  const handletagHandle = () => {


    let addcount = 0;
    console.log(gettag.length, "lenght")

    if (gettag.length == 0) {
      console.log("entered")
      addcount = addcount + 1;

    }
    if (gettag.length > 0) {
      addcount = gettag[gettag.length - 1] + 1;

    }


    console.log(addcount, "dataos ")


    setgentag([...gettag, addcount]);






  }




  console.log(gettag, "dddgdg")

  return (


    <>
      <header>
        {/* Content to display on every page */}
        <h1 >My App Header</h1>
        <h1>added new line s</h1>
        <h2>new line</h2>
        <h3>added new line also </h3>
      </header>
      <p>{count} </p>
      hew faesaggsa


      new part of component is this

      <button onClick={() => setCount(count + 1)}>adds</button>


      {
        gettag.map((item) => {
          return (<>
            <div>
              {`The new peregraph line is ${item}`}


            </div>
          </>)
        })
      }



      <button onClick={handletagHandle}>add new p</button>


      <Routes>
        <Route path='/dashboard' element={<HomePage />} />
        <Route exact path="/register" element={<SingupPage />} />
        <Route path="/login" element={<LoginPage getData={getDataFun} />} />
        <Route path='/activation/:activation_token' element={<ActivationPage />} />
      </Routes>

      <footer>


        this is added in the footer



        {/* Content to display on every page */}
        <p>added footer</p>
        <p>© 2023 My App Footer</p>
      </footer>

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
