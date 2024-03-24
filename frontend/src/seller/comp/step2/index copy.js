import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const OTPInput = ({ length, onComplete }) => {
    const [otp, setOTP] = useState(['', '', '', '', '', '']);
    const inputRefs = [];

    const handleInputChange = (index, e) => {
        const value = e.target.value;
        if (isNaN(value) || value.length !== 1) return; // Only allow single digits
        const newOTP = [...otp];
        newOTP[index] = value;
        setOTP(newOTP);

        // Move to the next input field if a digit is entered
        if (value.length === 1 && index < length - 1) {
            inputRefs[index + 1].focus();
        }

        // Check if all fields are filled
        const isComplete = newOTP.every((digit) => digit.length === 1);
        if (isComplete) {
            onComplete(newOTP.join(''));
        }
    };

    const handleBackspace = (index, e) => {
        if (e.key === 'Backspace' && index > 0) {
            const newOTP = [...otp];
            newOTP[index] = '';
            setOTP(newOTP);
            inputRefs[index - 1].focus();
        }
    };

    const handleVerify = () => {
        const enteredOTP = otp.join('');
        onComplete(enteredOTP);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {otp.map((value, index) => (
                    <TextField
                        key={index}
                        type="text"
                        value={value}
                        onChange={(e) => handleInputChange(index, e)}
                        onKeyDown={(e) => handleBackspace(index, e)}
                        inputRef={(input) => (inputRefs[index] = input)}
                        variant="outlined"
                        size="small"
                        style={{ margin: '4px' }}
                        inputProps={{ maxLength: 1 }}
                    />
                ))}
            </div>
            <Button variant="contained" color="primary" onClick={handleVerify}>
                Verify
            </Button>
        </div>
    );
};

export default OTPInput;
