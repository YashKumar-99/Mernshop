import React from 'react';
import { useState } from 'react';
import { Paper, TextField, MenuItem, Select, InputLabel, Box, Button } from '@mui/material';

import { useReducer } from 'react';


import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { toast } from 'react-toastify';
import axios from 'axios';


import { fetchAuthSeller } from '../../../redux/features/sellerAuth';

import { useDispatch, useSelector } from 'react-redux';
import { product } from '../ProductData';
import Cookies from 'js-cookie';


import { useRef } from 'react';
import { notRefershToken } from '../../../redux/features/sellerAuth';


import { products } from './product';

const CreateProduct = () => {



  const [temp, setTemp] = useState(products);

  console.log(temp, "heyworldthere!!")

  const first1 = temp.splice(0, 1)


  const [firstten, setfirstten] = useState(first1);

  const [second, setSecond] = useState([]);


  temp.map((item, index) => {

    const pricewithdiscount = ((item.price) - (item.price * 5 / 100));
    const stock = index * 2;
    second.push({
      shopId: index,
      name: item.title,
      description: item.description,
      category: item.category.name,
      orignalPrice: item.price,
      pricewithdiscount: pricewithdiscount,
      stock: stock,
      productImage: item.images








    })

  })



  const ButtonHandler = async () => {

    const data = second[0];

    await axios.post('/seller/temp', data).then((res) => console.log(res)).catch((err) => console.log(err, "eerere"))




  }

  console.log(firstten, "aabb")
  console.log(second, "secondseond")

  const refDoms = useRef();

  const { auth } = useSelector((store) => store.sellerAuth)

  const reduxDispatch = useDispatch();

  // const tags = ['Tag1', 'Tag2', 'Tag3', 'Tag4', 'Tag5'];


  const [productArr, setProductArr] = useState(product);



  const [productImageArr, setProductImageArr] = useState([])

  const categories = ["Electronics", 'Clothes', 'Miscellaneous', 'Shoes', 'cat5', 'cat6', 'cat7'];

  const intialState = {
    name: '',
    description: '',
    category: '',
    tag: [],
    orignalPrice: '',
    pricewithdiscount: '',
    stock: '',
    productImage: []
    // productImage: ''

  };



  function reducer(state, action) {


    if (action.type === 'productName') {
      return state = { ...state, name: action.payload }
    }



    if (action.type === 'productDetails') {
      return state = { ...state, description: action.payload }
    }
    if (action.type === 'selectCategory') {
      return state = { ...state, category: action.payload }
    }
    if (action.type === 'addTag') {
      return state = { ...state, tag: [...state.tag, { id: Date.now(), tagname: action.payload }] }
    }
    if (action.type === 'deleteTag') {

      return state = { ...state, tag: [...state.tag.filter((item) => item.id !== action.payload)] }
    }

    if (action.type === 'orignalPrice') {

      return state = { ...state, orignalPrice: action.payload }
    }
    if (action.type === 'priceWithDescount') {

      return state = { ...state, pricewithdiscount: action.payload }
    }
    if (action.type === 'stock') {

      return state = { ...state, stock: action.payload }
    }

    // if (action.type === 'uploadimage') {

    //   console.log(action, "actions...")

    //   return state = { ...state, productImage: [...state.productImage, { id: Date.now(), file: action.payload }] }

    // }

    if (action.type === 'uploadimage') {
      const filesArray = Array.from(action.payload); // Convert FileList to array
      return state = { ...state, productImage: [...state.productImage, ...filesArray.map(file => ({ id: Date.now(), file }))] };
    }


    if (action.type === 'reset') {



      return intialState;
    }
    return state;



  }



  const [state, dispatch] = useReducer(reducer, intialState);

  console.log(state.productImage, "productImage...!!")

  const [tagval, setTagVal] = useState('')
  const [file, setFile] = useState(null)


  console.log(file, "files")

  console.log(state, "useReducer.. is  here!!")
  const [tagInput, setTagInput] = useState('');

  const [tags, setTags] = useState([]);



  const handleTagInputChange = (event) => {

    setTagInput(event.target.value);
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== '' && !tags.includes(tagInput)) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag) => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
  };





  function TagHandler(e) {

    e.preventDefault();



    if (tagval) {

      dispatch({ type: 'addTag', payload: tagval });
      setTagVal('')
    }




  }


  // console.log(refDoms, "RefDom is herere")


  async function submitHandlerButton(e) {

    e.preventDefault();


    console.log(refDoms, "RefDom is herere")

    alert("called!!");




    const { name,
      description,
      category,
      orignalPrice,
      pricewithdiscount,
      stock,
      tag,
      productImage } = state;










    if (!name || !description || !category || !orignalPrice || !pricewithdiscount || !stock || !productImage) {


      toast.warn('Please the all filed !!');
      return;

    }



    var formData = new FormData();

    console.log(productImage, "Pi")


    // formData.append("file", productImage);
    // formData = { ...state }


    // console.log(state, "imaga");


    for (const key in state) {
      if (state[key] !== null && state[key] !== undefined) {
        if (key === 'productImage') {

          console.log(key, 'dffsf')
          state[key].forEach((fileObj, index) => {
            // formData.append(`${key}[${index}]`, fileObj.file);
            formData.append(`productImage`, fileObj.file);

          });
        } else if (key === 'tag') {
          formData.append(key, JSON.stringify(state[key]));
        } else {
          formData.append(key, state[key]);
        }
      }
    }





    // const tagData = formData.get('tag');

    // const objdata = JSON.stringify(tagData)

    // console.log(objdata, "dfd")


    const accessTokenID = Cookies.get('accessTokenID');




    if (!accessTokenID) {
      await reduxDispatch(fetchAuthSeller());

      const accessTokenIDa = Cookies.get('accessTokenID');


      console.log(accessTokenIDa, "aaaa");


    }


    await axios.post('/seller/createProduct', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => {



      if (res.status === 201) {

        const { message } = res.data;

        toast.success(message);
        dispatch({ type: 'reset' });



      } else {


        toast.warn("something went wrong!!")

      }

    }).catch((err) => {
      console.log(err, "error is this!!")
    })


    refDoms.current.reset(); // Resetting the form using form.reset()


  }




  async function submitHandler(e) {

    e.preventDefault();


    console.log(refDoms, "RefDom is herere")

    alert("called!!");




    const { name,
      description,
      category,
      orignalPrice,
      pricewithdiscount,
      stock,
      tag,
      productImage } = state;










    if (!name || !description || !category || !orignalPrice || !pricewithdiscount || !stock || !productImage) {


      toast.warn('Please the all filed !!');
      return;

    }



    var formData = new FormData();

    console.log(productImage, "Pi")


    // formData.append("file", productImage);
    // formData = { ...state }


    // console.log(state, "imaga");


    for (const key in state) {
      if (state[key] !== null && state[key] !== undefined) {
        if (key === 'productImage') {

          console.log(key, 'dffsf')
          state[key].forEach((fileObj, index) => {
            // formData.append(`${key}[${index}]`, fileObj.file);
            formData.append(`productImage`, fileObj.file);

          });
        } else if (key === 'tag') {
          formData.append(key, JSON.stringify(state[key]));
        } else {
          formData.append(key, state[key]);
        }
      }
    }





    // const tagData = formData.get('tag');

    // const objdata = JSON.stringify(tagData)

    // console.log(objdata, "dfd")


    const accessTokenID = Cookies.get('accessTokenID');




    if (!accessTokenID) {
      await reduxDispatch(fetchAuthSeller());

      const accessTokenIDa = Cookies.get('accessTokenID');


      console.log(accessTokenIDa, "aaaa");


    }


    await axios.post('/seller/createProduct', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => {



      if (res.status === 201) {

        const { message } = res.data;

        toast.success(message);
        dispatch({ type: 'reset' });



      } else {


        toast.warn("something went wrong!!")

      }

    }).catch((err) => {
      console.log(err, "error is this!!")
    })


    refDoms.current.reset(); // Resetting the form using form.reset()


  }




  return (

    <>
      <Paper style={{ maxWidth: '70%', margin: 'auto', background: '#c2c2c252', padding: '5%' }} >

        <h1>CreateProduct</h1>


        {/* <button onClick={ButtonHandler}>click here</button> */}

        <form onSubmit={submitHandler} ref={refDoms}>
          <InputLabel id="name" >Name</InputLabel>
          <TextField id="name" label="Name" value={state.name} onChange={(e) => dispatch({ type: 'productName', payload: e.target.value })} fullWidth required />
          <InputLabel id="description">Write about your product</InputLabel>
          <TextField id="description" value={state.description} onChange={(e) => dispatch({ type: 'productDetails', payload: e.target.value })} label="Description" fullWidth multiline rows={3} required />
          <InputLabel id="product-category">Categroy</InputLabel>
          <div>

            <Select
              id="product-category"
              label="category"
              fullWidth
              value={state.category}
              onChange={(e) => dispatch({ type: 'selectCategory', payload: e.target.value })}

            >

              {

                categories.map((cat, index) => {



                  return <MenuItem

                    value={categories[index]}

                  >
                    {cat}
                  </MenuItem>

                })
              }

            </Select>



          </div>



          {/* <div>
            <TextField
              id="tags"
              label="Tags"
              variant="outlined"
              fullWidth
              value={tagInput}
              onChange={handleTagInputChange}
              sx={{ margin: '10px 0px' }}
            />

          </div>


          <div>


            {tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="remove-tag"
                >
                  x
                </button>
              </span>
            ))}

          </div>

          <div>

            <Button
              variant="contained"
              color="primary"
              id="addTag"
              onClick={handleAddTag}
              style={{ marginTop: '8px' }}
            >
              Add Tag
            </Button>
          </div> */}


          <InputLabel id="TagId" >Add Tag</InputLabel>

          <TextField
            type='text'
            name="tag"
            // value={''}
            fullWidth
            sx={{ margin: '10px 0px' }}
            label="Tag"
            id='TagId'
            value={tagval}
            onChange={(e) => setTagVal(e.target.value)}
          />
          <button onClick={TagHandler}>Add</button>


          {
            state?.tag?.map((obj) => {

              return (<>

                <span>
                  {obj.tagname}
                </span>
                <span>
                  <DeleteOutlineIcon onClick={() => dispatch({ type: 'deleteTag', payload: obj.id })} />
                </span>
              </>)
            })
          }

          <InputLabel id="price" >Origanl Price</InputLabel>
          <TextField id="price" value={state.orignalPrice} onChange={(e) => dispatch({ type: 'orignalPrice', payload: e.target.value })} label="Origanl Price" required />

          <InputLabel id="pricewithdiscount" >Price with discount</InputLabel>
          <TextField id="pricewithdiscount" value={state.pricewithdiscount} onChange={(e) => dispatch({ type: 'priceWithDescount', payload: e.target.value })} label="Price(With Discount)" required />


          <InputLabel id="productstock">Product Stock</InputLabel>
          <TextField id="productstock" value={state.stock} onChange={(e) => dispatch({ type: 'stock', payload: e.target.value })} label="Product Stock" />

          <InputLabel id="fileInput" >Upload product image</InputLabel>

          {/* <input
            type="file"
            name='file'

            id="file"
            onChange={(e) => dispatch({ type: 'uploadimage', payload: e.target.files[0] })}
          /> */}


          <input
            type="file"
            id="file"
            onChange={(e) => dispatch({ type: 'uploadimage', payload: e.target.files })}
            multiple  // Allow multiple files to be selected
          />



          <div>
            <Button variant="contained" type='submit' sx={{ margin: '20px 0px' }}>

              Create Product
            </Button>
          </div>



        </form>
      </Paper>



    </>
  )
}

export default CreateProduct