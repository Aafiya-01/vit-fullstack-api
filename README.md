# VIT Full Stack Assignment - REST API

A REST API built for VIT Full Stack Assignment that processes arrays and returns categorized data.

## 🚀 Live API

**API Endpoint**: https://bfhl-kjgc.onrender.com/bfhl

## 📋 Features

- ✅ Processes mixed arrays (numbers, alphabets, special characters)
- ✅ Separates odd and even numbers
- ✅ Converts alphabets to uppercase
- ✅ Identifies special characters
- ✅ Calculates sum of all numbers
- ✅ Creates concatenated string with alternating caps in reverse order
- ✅ Proper error handling
- ✅ CORS enabled

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Hosting**: Vercel (or your chosen platform)
- **Version Control**: Git, GitHub

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/vit-fullstack-api.git
cd vit-fullstack-api
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. For production:
```bash
npm start
```

## 🔧 Configuration

Update your personal details in `server.js`:

```javascript
const USER_ID = "your_name_ddmmyyyy"; // Format: firstname_lastname_ddmmyyyy
const EMAIL = "your.email@example.com";
const ROLL_NUMBER = "YOUR123";
```

## 📚 API Documentation

### POST /bfhl

Processes an array and returns categorized data.

**Request Body:**
```json
{
  "data": ["a", "1", "334", "4", "R", "$"]
}
```

**Response:**
```json
{
  "is_success": true,
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "odd_numbers": ["1"],
  "even_numbers": ["334", "4"],
  "alphabets": ["A", "R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

### GET /bfhl

Returns operation code for verification.

**Response:**
```json
{
  "operation_code": 1
}
```

## 🧪 Testing

Run tests locally:
```bash
npm test
```

Or test manually with curl:
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"data": ["a","1","334","4","R", "$"]}'
```

## 📁 Project Structure

```
vit-fullstack-api/
├── server.js          # Main application file
├── package.json       # Dependencies and scripts
├── vercel.json        # Vercel deployment configuration
├── test.js           # Test cases
├── .gitignore        # Git ignore rules
└── README.md         # Project documentation
```

## 🚀 Deployment

### Vercel Deployment

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login and deploy:
```bash
vercel login
vercel --prod
```

### Alternative Platforms

- **Railway**: Connect GitHub repo and deploy
- **Render**: Choose "Web Service" and deploy
- **Heroku**: Use git deployment

## ✅ Test Cases

The API handles these test cases:

1. **Example A**: Mixed array with numbers, alphabets, and special characters
2. **Example B**: Complex array with multiple data types  
3. **Example C**: String-only array with multi-character strings

## 🔍 Key Logic

- Numbers are returned as strings
- Alphabets are converted to uppercase
- Special characters include all non-alphanumeric characters
- Concatenation string uses reverse order with alternating caps
- Proper error handling for invalid inputs

## 📝 Assignment Requirements

- ✅ POST method at /bfhl route
- ✅ Returns status code 200 for successful requests
- ✅ Proper user_id format (fullname_ddmmyyyy)
- ✅ All required response fields
- ✅ Numbers returned as strings
- ✅ Hosted on public platform
- ✅ Code pushed to public GitHub repository

## 👨‍💻 Author

Aafiya Choudhary 

## 📄 License

This project is licensed under the MIT License.
