const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();

const PORT = process.env.PORT || 3000;

// ربط قاعدة البيانات باستخدام الرابط من Railway
const MONGO_URL = process.env.MONGO_URL; 
if (MONGO_URL) {
    mongoose.connect(MONGO_URL)
        .then(() => console.log('Connected to MongoDB!'))
        .catch(err => console.log('DB Error:', err));
}

// إخبار السيرفر بفتح الملفات من مجلد public
app.use(express.static(path.join(__dirname, 'public')));

// إرسال ملف الـ HTML عند فتح الموقع
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log('TS Store Server is running on port ' + PORT);
});
