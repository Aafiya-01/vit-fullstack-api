const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Your personal details - REPLACE THESE WITH YOUR ACTUAL DETAILS
const USER_ID = "aafiya_choudhary_08052005"; // Format: firstname_lastname_ddmmyyyy
const EMAIL = "aafiyachoudhary0805@gmail.com";
const ROLL_NUMBER = "22BSA10071";

app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        
        // Validate input
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                message: "Invalid input data. Expected an array."
            });
        }

        const oddNumbers = [];
        const evenNumbers = [];
        const alphabets = [];
        const specialCharacters = [];
        let sum = 0;
        const allAlphabets = []; 

        // Process each item in the data array
        data.forEach(item => {
            const str = String(item);
            
            // Check if the entire string is a number
            if (!isNaN(str) && str.trim() !== '') {
                const num = parseInt(str);
                sum += num;
                
                if (num % 2 === 0) {
                    evenNumbers.push(str);
                } else {
                    oddNumbers.push(str);
                }
            }
            // Check if it's purely alphabetic
            else if (/^[a-zA-Z]+$/.test(str)) {
                alphabets.push(str.toUpperCase());
                for (let char of str.toLowerCase()) {
                    allAlphabets.push(char);
                }
            }
            // Mixed string - process character by character
            else {
                let hasNumber = false;
                let hasAlpha = false;
                let tempNumber = '';
                
                for (let char of str) {
                    if (!isNaN(char) && char !== ' ') {
                        tempNumber += char;
                        hasNumber = true;
                    } else if (/[a-zA-Z]/.test(char)) {
                        // If we were building a number, process it first
                        if (tempNumber) {
                            const num = parseInt(tempNumber);
                            sum += num;
                            if (num % 2 === 0) {
                                evenNumbers.push(tempNumber);
                            } else {
                                oddNumbers.push(tempNumber);
                            }
                            tempNumber = '';
                        }
                        
                        alphabets.push(char.toUpperCase());
                        allAlphabets.push(char.toLowerCase());
                        hasAlpha = true;
                    } else if (char !== ' ') {
                        // If we were building a number, process it first
                        if (tempNumber) {
                            const num = parseInt(tempNumber);
                            sum += num;
                            if (num % 2 === 0) {
                                evenNumbers.push(tempNumber);
                            } else {
                                oddNumbers.push(tempNumber);
                            }
                            tempNumber = '';
                        }
                        
                        specialCharacters.push(char);
                    }
                }
                
                // Process any remaining number
                if (tempNumber) {
                    const num = parseInt(tempNumber);
                    sum += num;
                    if (num % 2 === 0) {
                        evenNumbers.push(tempNumber);
                    } else {
                        oddNumbers.push(tempNumber);
                    }
                }
            }
        });

        // Create concatenated string with alternating caps (reverse order)
        const reversedAlphabets = allAlphabets.reverse();
        let concatString = '';
        reversedAlphabets.forEach((char, index) => {
            if (index % 2 === 0) {
                concatString += char.toUpperCase();
            } else {
                concatString += char.toLowerCase();
            }
        });

        const uniqueAlphabets = [...new Set(alphabets)];
        const uniqueSpecialChars = [...new Set(specialCharacters)];

        const response = {
            is_success: true,
            user_id: USER_ID,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            odd_numbers: oddNumbers,
            even_numbers: evenNumbers,
            alphabets: uniqueAlphabets,
            special_characters: uniqueSpecialChars,
            sum: sum.toString(),
            concat_string: concatString
        };

        res.status(200).json(response);

    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({
            is_success: false,
            message: "Internal server error"
        });
    }
});

// GET endpoint for testing
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ 
        message: "VIT Full Stack API is running!",
        endpoints: {
            post: "/bfhl - Main endpoint",
            get: "/bfhl - Operation code endpoint"
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        is_success: false,
        message: "Something went wrong!"
    });
});

// Handle 404
app.use((req, res) => {
    res.status(404).json({
        is_success: false,
        message: "Endpoint not found"
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;

// const express = require('express');
// const cors = require('cors');
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Your personal details
// const USER_ID = "your_name_ddmmyyyy"; // Replace with your details
// const EMAIL = "your.email@example.com";
// const ROLL_NUMBER = "YOUR123";

// app.post('/bfhl', (req, res) => {
//     try {
//         const { data } = req.body;
        
//         if (!data || !Array.isArray(data)) {
//             return res.status(400).json({
//                 is_success: false,
//                 message: "Invalid input data"
//             });
//         }

//         const oddNumbers = [];
//         const evenNumbers = [];
//         const alphabets = [];
//         const specialCharacters = [];
//         let sum = 0;
//         const allAlphabets = [];

//         // Process each item in the data array
//         data.forEach(item => {
//             const str = String(item);
            
//             // Process each character in the string
//             for (let char of str) {
//                 if (!isNaN(char) && char !== ' ') {
//                     // It's a number
//                     const num = parseInt(char);
//                     sum += num;
                    
//                     if (num % 2 === 0) {
//                         evenNumbers.push(char);
//                     } else {
//                         oddNumbers.push(char);
//                     }
//                 } else if (/[a-zA-Z]/.test(char)) {
//                     // It's an alphabet
//                     alphabets.push(char.toUpperCase());
//                     allAlphabets.push(char.toLowerCase());
//                 } else if (char !== ' ') {
//                     // It's a special character
//                     specialCharacters.push(char);
//                 }
//             }
//         });

//         // Create concatenated string with alternating caps
//         const reversedAlphabets = allAlphabets.reverse();
//         let concatString = '';
//         reversedAlphabets.forEach((char, index) => {
//             if (index % 2 === 0) {
//                 concatString += char.toUpperCase();
//             } else {
//                 concatString += char.toLowerCase();
//             }
//         });

//         const response = {
//             is_success: true,
//             user_id: USER_ID,
//             email: EMAIL,
//             roll_number: ROLL_NUMBER,
//             odd_numbers: oddNumbers,
//             even_numbers: evenNumbers,
//             alphabets: [...new Set(alphabets)], 
//             special_characters: specialCharacters,
//             sum: sum.toString(),
//             concat_string: concatString
//         };

//         res.status(200).json(response);

//     } catch (error) {
//         res.status(500).json({
//             is_success: false,
//             message: "Internal server error"
//         });
//     }
// });

// // Health check endpoint
// app.get('/', (req, res) => {
//     res.json({ message: "API is running!" });
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

// module.exports = app;