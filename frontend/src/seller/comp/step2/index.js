import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';

const StepSecond = () => {


    const [otp, setOtp] = useState('');

    const { email, fullhash } = useSelector((store) => store.sellerVerify)

    console.log(email, fullhash, "Fullhash")

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!otp) {
            alert("Please fill the all otp!!");
            return;
        }

        if (!email && !fullhash) {

            alert('email is not availabe!!');
            return;
        }


        await axios.post('/seller/verifyOtp', {
            email, fullhash, otp
        })
    }

    return (
        <div style={{ margin: '5%' }}>


            <input type='text' value={otp} onChange={(e) => setOtp(e.target.value)} />
            <button onClick={handleSubmit}>verify now</button>

        </div>
    )
}

export default StepSecond