const mongoose = require('mongoose');




const tagSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    tagname: {
        type: String,
        required: true,
        trim: true
    }
});





const ProductSchema = new mongoose.Schema({

    // shopId: {
    //     type: String,
    //     required: true
    // },

    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'seller', // This should match the model name of your Seller schema
        required: true
    },

    name: {
        type: String,
        required: true,
        trim: true
    },

    description: {

        type: String,
        required: true,
        trim: true
    }
    ,
    category: {
        type: String,
        required: true,
    },
    tag: [tagSchema],
    orignalPrice: {
        type: String,
        required: true,
    },
    pricewithdiscount: {
        type: String,
        required: true,
    },
    stock: {
        type: String,
        // required: true,
    },
    productImage: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Image',
        }
    ],
    // productImage: [
    //     {
    //         id: {
    //             type: mongoose.Schema.Types.ObjectId,
    //         },
    //         path: {
    //             type: String,
    //             required: true,
    //         }
    //     }
    // ],


    sold_out: {
        type: Number,
    },
    createAt: {
        type: Date,
        default: Date.now()

    }

})



module.exports = mongoose.model('product', ProductSchema);