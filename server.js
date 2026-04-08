const express = require('express');
const path = require('path');
const mongoose = require('mongoose'); // مكتبة الربط مع الداتا
const app = express();

const PORT = process.env.PORT || 3000;

// سطر الربط مع قاعدة البيانات باستخدام المتغيرات التلقائية في Railway
const MONGO_URL = process.env.MONGO_URL; 
if (MONGO_URL) {
    mongoose.connect(MONGO_URL)
        .then(() => console.log('Connected to MongoDB Successfully! ✅'))
        .catch(err => console.log('Database Connection Error: ❌', err));
}

// تشغيل ملف الـ HTML من المجلد الرئيسي مباشرة
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log('TS Store Server is active on port ' + PORT);
});
