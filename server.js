const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();

const PORT = process.env.PORT || 3000;

// ضع رابطك هنا بين علامتي التنصيص
const myDatabaseLink = "mongodb://mongo:krKokQXjLADvZqjrbNRZBrddlxwzyhfo@mongodb.railway.internal:27017"; 

mongoose.connect(myDatabaseLink)
    .then(() => console.log('✅ Connected to MongoDB Successfully!'))
    .catch(err => console.log('❌ DB Connection Error:', err));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});
