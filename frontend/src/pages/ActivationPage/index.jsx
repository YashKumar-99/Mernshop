import React, { useState } from 'react'


import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';


const ActivationPage = () => {


    const { activation_token } = useParams();

    const { error, setError } = useState(null);

    console.log(activation_token, "activation_token");



    const callActvationApi = async () => {



        try {

            await axios.post('/user/activation', {

                activation_token
            }).then((res) => {
                console.log(res);

                if (res.statusCode === 201) {
                    setError(false)


                } else {
                    setError(true)

                }


            }).catch((error) => {
                setError(false)

                console.log(error);


            })

        } catch (error) {
            console.log(error, "error occured!!")
        }




    }




    useEffect(() => {

        callActvationApi()

        console.log("calling userEffect")


    }, [])


    return (
        <div>
            Activation page


            {error ? (<h1>Your token is expired!!</h1>) : (<h1>Congartion , Your account has been created successfully! </h1>)}



        </div>



    )
}

export default ActivationPage