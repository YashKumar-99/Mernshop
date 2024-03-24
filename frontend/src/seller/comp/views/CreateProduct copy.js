import React from 'react';
import { useState } from 'react';
import { Paper, TextField, MenuItem, Select, InputLabel, Box, Button } from '@mui/material';

import { useReducer } from 'react';





const CreateProduct = () => {

  // const tags = ['Tag1', 'Tag2', 'Tag3', 'Tag4', 'Tag5'];


  console.log(useReducer,"useReducer.. is  here!!")

  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');



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

  return (

    <>
      <Paper style={{ maxWidth: '70%', margin: 'auto', background: '#c2c2c252', padding: '5%' }} >

        <h1>CreateProduct</h1>

        <form>

          <InputLabel id="name">Name</InputLabel>
          <TextField id="name" label="Name" fullWidth required />
          <InputLabel id="description">Write about your product</InputLabel>
          <TextField id="description" label="Description" fullWidth multiline rows={3} required />
          <InputLabel id="product-category">Categroy</InputLabel>
          <div>

            <Select
              id="product-category"
              label="category"
              value=''
              fullWidth
            >
              <MenuItem value='a'>a</MenuItem>
              <MenuItem value='b'>b</MenuItem>
              <MenuItem value='c'>c</MenuItem>
            </Select>
          </div>




          <div>
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
          </div>

          <InputLabel id="price">Origanl Price</InputLabel>
          <TextField id="price" label="Origanl Price" required />

          <InputLabel id="pricewithdiscount">Price with discount</InputLabel>
          <TextField id="pricewithdiscount" label="Price(With Discount)" required />


          <InputLabel id="productstock">Product Stock</InputLabel>
          <TextField id="productstock" label="Product Stock" required />

          <InputLabel id="fileInput">Upload product image</InputLabel>

          <input
            type="file"
            id="fileInput"
            onChange={''}
          />


          <div>
            <Button variant="contained" sx={{ margin: '20px 0px' }}>

              Create Product
            </Button>
          </div>



        </form>
      </Paper>



    </>
  )
}

export default CreateProduct