const express = require('express');
const app = express();

// استخدام المنفذ الذي توفره الاستضافة أو 3000 محلياً
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send(`
        <body style="background-color: #0f0f0f; color: red; text-align: center; font-family: sans-serif; padding-top: 100px;">
            <h1>TS Store is Online</h1>
            <p style="color: white;">Welcome to your FiveM Store project.</p>
        </body>
    `);
});

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});