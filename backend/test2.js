const fs = require('fs');
const path = require('path');

async function downloadImage(url, destination) {
    const response = await fetch(url);

    const fileStream = fs.createWriteStream(destination);
    await new Promise((resolve, reject) => {
        response.body.pipe(fileStream);
        response.body.on('error', (err) => {
            reject(err);
        });
        fileStream.on('finish', function () {
            resolve();
        });
    });
}

async function downloadImages(imageUrls, folderPath) {
    for (let i = 0; i < imageUrls.length; i++) {
        const imageUrl = imageUrls[i];
        const imageName = `image${i + 1}.jpg`; // You can customize the naming convention
        const imagePath = path.join(folderPath, imageName);

        console.log(`Downloading ${imageName}...`);

        await downloadImage(imageUrl, imagePath);
    }

    console.log('Download complete!');
}

// Replace 'YOUR_UNSPLASH_API_KEY' and 'YOUR_SEARCH_TERM' with appropriate values

const UNSPLASH_API_KEY = 'CM0WbcjViiEWwhc-2dCOd5m-LfHtSmB01y3HxuI_KzU';
const searchUrl = `https://api.unsplash.com/photos/random?count=100&query=YOUR_SEARCH_TERM&client_id=${UNSPLASH_API_KEY}`;


fetch(searchUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.errors) {
            throw new Error(`Unsplash API error: ${JSON.stringify(data.errors)}`);
        }

        const imageUrls = data.map(photo => photo.urls.full);
        const folderPath = path.join(__dirname, 'downloaded_images');

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }

        if (imageUrls.length === 0) {
            console.warn('No images found for the given search term.');
        } else {
            downloadImages(imageUrls, folderPath);
        }
    })
    .catch(error => {
        console.error('Error:', error.message);
    });
