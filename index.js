// GET endpoint for testing
app.get('/bfhl', (req, res) => {
  res.status(200).json({
    operation_code: 1
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: "VIT Full Stack API is running",
    endpoints: {
      main: "/bfhl (POST)",
      test: "/bfhl (GET)"
    }
  });
});

// Export for Vercel
module.exports = app;

// For local development
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}



const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// CORS middleware (if needed)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Helper function to process the array
function processArray(data) {
  const result = {
    odd_numbers: [],
    even_numbers: [],
    alphabets: [],
    special_characters: [],
    sum: 0
  };

  let alphabetChars = [];

  data.forEach(item => {
    // Check if it's a number
    if (!isNaN(item) && item !== '') {
      const num = parseInt(item);
      if (num % 2 === 0) {
        result.even_numbers.push(item.toString());
      } else {
        result.odd_numbers.push(item.toString());
      }
      result.sum += num;
    }
    // Check if it's alphabetic
    else if (/^[a-zA-Z]+$/.test(item)) {
      result.alphabets.push(item.toUpperCase());
      // Store individual characters for concatenation
      for (let char of item) {
        alphabetChars.push(char.toLowerCase());
      }
    }
    // Everything else is special character
    else {
      result.special_characters.push(item);
    }
  });

  // Create concatenated string in reverse order with alternating caps
  const reversedChars = alphabetChars.reverse();
  let concatString = '';
  for (let i = 0; i < reversedChars.length; i++) {
    if (i % 2 === 0) {
      concatString += reversedChars[i].toLowerCase();
    } else {
      concatString += reversedChars[i].toUpperCase();
    }
  }

  result.concat_string = concatString;
  result.sum = result.sum.toString();

  return result;
}

// Main API endpoint
app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        error: "Invalid input: 'data' should be an array"
      });
    }

    const processedResult = processArray(data);

    const response = {
      is_success: true,
      user_id: "aafiya_choudhary_08052005", 
      email: "aafiyachoudhary0805@gmail.com", 
      roll_number: "22BSA10071",
      ...processedResult
    };

    res.status(200).json(response);

  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({
      is_success: false,
      error: "Internal server error"
    });
  }
});

// GET endpoint for testing
app.get('/bfhl', (req, res) => {
  res.status(200).json({
    operation_code: 1
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: "VIT Full Stack API is running",
    endpoints: {
      main: "/bfhl (POST)",
      test: "/bfhl (GET)"
    }
  });
});

// Export for Vercel
module.exports = app;

// For local development
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}