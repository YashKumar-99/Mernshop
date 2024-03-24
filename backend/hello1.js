const fs = require('fs');
const axios = require('axios');


const product = require('./models/Product');




const imageUrl = 'https://i.imgur.com/dV4Nklf.jpeg';
const outputPath = `uploads/abc/${Date.now()}.jpeg`;

axios
  .get(imageUrl, { responseType: 'arraybuffer' })
  .then((response) => {
    fs.writeFileSync(outputPath, Buffer.from(response.data, 'binary'));
    console.log('Image saved successfully:', outputPath);
  })
  .catch((error) => {
    console.error('Error downloading image:', error);
  });


