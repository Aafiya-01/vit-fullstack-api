// api/index.js
export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    res.status(200).json({ 
        message: "VIT Full Stack API is running!",
        endpoints: {
            post: "/api/bfhl - Main endpoint",
            get: "/api/bfhl - Operation code endpoint"
        }
    });
}