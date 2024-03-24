const mongoose = require('mongoose');



const connectDatabase = () => {

    mongoose.connect(process.env.DB_URLUserYash, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((data) => {

        console.log(`MongoDb Connected with Server : ${data.connection.host}`)
    }).catch((error) => {
        if (error.name === 'MongoServerSelectionError') {
            console.log('Error: Could not connect to MongoDB Atlas. Please check your connection string and IP whitelist.');
        } else {
            console.log('Error other:', error);
        }

        // console.log('error  is ', error)
    })



}

// const connectDatabase = () => {
//     mongoose.connect(`mongodb+srv://Yash:1234@mernshopcluster.zxty6te.mongodb.net/`, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         connectTimeoutMS: 30000, // optional: specify the timeout for the initial connection attempt
//         socketTimeoutMS: 45000,  // optional: specify the timeout for I/O operations
//     }).then((data) => {
//         console.log(`MongoDb Connected with Server: ${data.connection.host}`);
//     }).catch((error) => {
//         console.log('Error is ', error);
//     });
// };


module.exports = connectDatabase;