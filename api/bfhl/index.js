// api/bfhl/index.js
const USER_ID = "aafiya_choudhary_08052005";
const EMAIL = "aafiyachoudhary0805@gmail.com";
const ROLL_NUMBER = "22BSA10071";

export default function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'POST') {
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
                    let tempNumber = '';
                    
                    for (let char of str) {
                        if (!isNaN(char) && char !== ' ') {
                            tempNumber += char;
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
    } 
    else if (req.method === 'GET') {
        res.status(200).json({
            operation_code: 1
        });
    }
    else {
        res.status(405).json({
            is_success: false,
            message: "Method not allowed"
        });
    }
}