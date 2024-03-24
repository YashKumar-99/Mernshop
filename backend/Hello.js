// Define the URL for JSONPlaceholder's POST endpoint
const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

// Create a sample post data
const postData = {
    title: 'Test Post',
    body: 'This is a test post. Lorem ipsum dolor sit amet.',
    userId: 1, // Use any user ID you prefer (1, 2, 3, etc.)
};

// Convert the data to JSON format
const jsonData = JSON.stringify(postData);

// Define the request options, including the method, headers, and body
const requestOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
    },
    body: jsonData, // The JSON data to send in the request body
};

// Send the POST request using the fetch API
fetch(apiUrl, requestOptions)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response as JSON
    })
    .then((data) => {
        // Handle the response data here
        console.log('Response data:', data);
    })
    .catch((error) => {
        // Handle any errors that occurred during the fetch
        console.error('Error:', error);
    });
