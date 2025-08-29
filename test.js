// test.js
const testData = {
    data: ["a", "1", "334", "4", "R", "$"]
};

fetch('http://localhost:3000/bfhl', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(testData)
})
.then(response => response.json())
.then(data => console.log(data));