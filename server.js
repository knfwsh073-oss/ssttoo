const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));

// الربط المباشر واليدوي لضمان عمل الداتا فوراً
const MONGO_URL = "mongodb://mongo:IxndzRotERjBWgdeSkMaHfqJjiDrcLhU@mongodb.railway.internal:27017"; 

mongoose.connect(MONGO_URL)
    .then(() => console.log('✅ Connected to MongoDB Successfully!'))
    .catch(err => console.log('❌ DB Connection Error:', err));

// تعريف الجداول (المنتجات، الموظفين، الخصومات)
const Product = mongoose.model('Product', new mongoose.Schema({ name: String, price: Number, image: String, description: String, features: Array, discount: Object }, { strict: false }));
const Staff = mongoose.model('Staff', new mongoose.Schema({}, { strict: false }));
const Coupon = mongoose.model('Coupon', new mongoose.Schema({}, { strict: false }));

// --- المسارات الذكية (ترد على أي طلب يرسله Z AI) ---

// استقبال إضافة أي شيء (منتج، موظف، كود خصم)
app.post('/api/admin/:type', async (req, res) => {
    try {
        const type = req.params.type;
        let Model = (type === 'products') ? Product : (type === 'staff') ? Staff : Coupon;
        const entry = new Model(req.body);
        await entry.save();
        res.status(200).json({ success: true });
    } catch (err) { res.status(500).send(err); }
});

// جلب المنتجات ليراها الجميع
app.get('/api/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server active on port ${PORT}`));
