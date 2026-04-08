const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const app = express();

// إعدادات أساسية
const PORT = process.env.PORT || 3000;
app.use(express.json()); // للسماح باستقبال بيانات JSON من لوحة التحكم
app.use(cors());
app.use(express.static(__dirname)); // لتشغيل ملفات HTML والصور من المجلد الرئيسي

// 1. الربط مع قاعدة البيانات (تلقائي عبر Railway أو يدوي)
const MONGO_URL = process.env.MONGO_URL || "mongodb://mongo:IxndzRotERjBWgdeSkMaHfqJjiDrcLhU@mongodb.railway.internal:27017"; 

mongoose.connect(MONGO_URL)
    .then(() => console.log('✅ Connected to MongoDB Successfully!'))
    .catch(err => console.log('❌ Database Connection Error:', err));

// 2. تعريف نماذج البيانات (Schemas)
const Product = mongoose.model('Product', new mongoose.Schema({
    name: String, image: String, description: String, 
    features: [String], price: Number, 
    discount: { active: Boolean, percent: Number, duration: String },
    category: String // سيارات أو مابات
}));

const Staff = mongoose.model('Staff', new mongoose.Schema({
    email: String, password: String, permissions: Object
}));

const Member = mongoose.model('Member', new mongoose.Schema({
    username: String, email: String, joinDate: { type: Date, default: Date.now }
}));

const Coupon = mongoose.model('Coupon', new mongoose.Schema({
    code: String, discount: Number
}));

// 3. المسارات البرمجية (API Routes)

// جلب المنتجات للجميع
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) { res.status(500).send(err); }
});

// إضافة منتج جديد (من لوحة التحكم)
app.post('/api/admin/add-product', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(200).json({ message: "تم الحفظ بنجاح" });
    } catch (err) { res.status(500).send(err); }
});

// حذف منتج
app.delete('/api/admin/delete-product/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.send("تم الحذف");
});

// إدارة الموظفين
app.post('/api/admin/add-staff', async (req, res) => {
    const staff = new Staff(req.body);
    await staff.save();
    res.send("تمت إضافة الموظف");
});

// إدارة أكواد الخصم
app.post('/api/admin/add-coupon', async (req, res) => {
    const coupon = new Coupon(req.body);
    await coupon.save();
    res.send("تم تفعيل الكود");
});

// 4. تشغيل الموقع
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 TS Store Server is running on port ${PORT}`);
});
