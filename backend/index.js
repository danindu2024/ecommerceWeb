const port = 4000;
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path')
const cors = require('cors');
const { type } = require('os');

// Load environment variables
require('dotenv').config();

app.use(express.json())
app.use(cors())

// Import PayPal routes
const paypalRoutes = require('./routes/paypal');

// Database Connection with MongoDB
mongoose.connect("mongodb+srv://danindu:daninduPass@cluster0.pqlevkt.mongodb.net/e-commerce")

//API Creatation

app.get("/", (req, res)=> {
    res.send("Express App is Running")
})

// Use PayPal routes
app.use('/paypal', paypalRoutes);

// Add endpoint to get PayPal client ID for frontend
app.get('/config/paypal', (req, res) => {
    res.json({
        clientId: process.env.PAYPAL_CLIENT_ID
    });
});

// Image Storage Engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

//Creating Uploading Endpoint for images

app.use('/images', express.static('upload/images'))

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

//Schema for creating products

const Product = mongoose.model("Product", {
    id:{
        type: Number,
        required: true,
    },
    name:{
        type: String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    new_price:{
        type:Number,
        required:true
    },
    old_price:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    available:{
        type:Boolean,
        default:true,
    },
    description: { 
        type: String,
        required: false,
    },
})

// Schema for User Cart
const UserCart = mongoose.model("UserCart", {
    userId: {
        type: String,
        required: true,
        unique: true
    },
    cartItems: {
        type: Map,
        of: Number,
        default: {}
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
})

//API for add product

app.post('/addProduct', async (req, res) => {

    let products = await Product.find({});
    let id;

    if(products.length>0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1
    }else{
        id=1;
    }

    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
        description: req.body.description,
    })

    console.log(product);

    await product.save();

    console.log("saved");

    res.json({
        success:true,
        name:req.body.name,
    })
})

// API for delete product

app.post('/removeProduct', async (req, res) => {
    await Product.findOneAndDelete({id:req.body.id})

    console.log("removed");

    res.json({
        success:true,
        name:req.body.name
    })
    
})

// API for get all products

app.get('/allProducts', async (req, res) => {
    let products = await Product.find({})
    console.log("All products fetched");

    res.send(products)
    
})

// API for searching products
app.get('/search', async (req, res) => {
    try {
        const { q, category, sort, limit = 50 } = req.query;
        
        let query = {};
        
        // Build search query
        if (q) {
            query.$or = [
                { name: { $regex: q, $options: 'i' } },
                { category: { $regex: q, $options: 'i' } }
            ];
        }
        
        // Filter by category if specified
        if (category && category !== 'all') {
            query.category = category;
        }
        
        // Only show available products
        query.available = true;
        
        let products = await Product.find(query).limit(parseInt(limit));
        
        // Apply sorting
        if (sort) {
            switch (sort) {
                case 'price-low-high':
                    products.sort((a, b) => a.new_price - b.new_price);
                    break;
                case 'price-high-low':
                    products.sort((a, b) => b.new_price - a.new_price);
                    break;
                case 'name-a-z':
                    products.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'name-z-a':
                    products.sort((a, b) => b.name.localeCompare(a.name));
                    break;
                case 'newest':
                    products.sort((a, b) => new Date(b.date) - new Date(a.date));
                    break;
                case 'oldest':
                    products.sort((a, b) => new Date(a.date) - new Date(b.date));
                    break;
            }
        }
        
        res.json({
            success: true,
            products: products,
            count: products.length
        });
        
    } catch (error) {
        console.error('Search error:', error);
        res.json({
            success: false,
            error: 'Search failed'
        });
    }
});

// API for product suggestions (autocomplete)
app.get('/suggestions', async (req, res) => {
    try {
        const { q } = req.query;
        
        if (!q || q.length < 2) {
            return res.json({ suggestions: [] });
        }
        
        const products = await Product.find({
            $and: [
                { available: true },
                {
                    $or: [
                        { name: { $regex: q, $options: 'i' } },
                        { category: { $regex: q, $options: 'i' } }
                    ]
                }
            ]
        }).limit(5).select('name category');
        
        // Extract unique suggestions
        const suggestions = [];
        const seen = new Set();
        
        products.forEach(product => {
            if (!seen.has(product.name)) {
                suggestions.push({
                    text: product.name,
                    type: 'product'
                });
                seen.add(product.name);
            }
        });
        
        // Add category suggestions
        const categories = ['men', 'women', 'kids'];
        categories.forEach(cat => {
            if (cat.toLowerCase().includes(q.toLowerCase()) && !seen.has(cat)) {
                suggestions.push({
                    text: cat,
                    type: 'category'
                });
                seen.add(cat);
            }
        });
        
        res.json({ suggestions: suggestions.slice(0, 5) });
        
    } catch (error) {
        console.error('Suggestions error:', error);
        res.json({ suggestions: [] });
    }
});

//Endpoint for new collection

app.get('/newcollection', async (req, res) => {
    let products = await Product.find({})
    let newCollection = products.slice(1).slice(-8)

    console.log("new collection fetched");
    res.send(newCollection)
    
})

//Endpoint for popular in women section
app.get('/popularwomen', async (req, res) => {
    let products = await Product.find({category: "women"})
    let popularWomen = products.slice(1).slice(-4)
    res.send(popularWomen)
})

// Cart APIs

// Get user cart
app.get('/cart/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const userCart = await UserCart.findOne({ userId: userId });
        
        if (userCart) {
            res.json({
                success: true,
                cartItems: userCart.cartItems
            });
        } else {
            res.json({
                success: true,
                cartItems: {}
            });
        }
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.json({
            success: false,
            error: 'Failed to fetch cart'
        });
    }
});

// Save/Update user cart
app.post('/cart/save', async (req, res) => {
    try {
        const { userId, cartItems } = req.body;
        
        if (!userId) {
            return res.json({
                success: false,
                error: 'User ID is required'
            });
        }

        const existingCart = await UserCart.findOne({ userId: userId });
        
        if (existingCart) {
            existingCart.cartItems = cartItems;
            existingCart.lastUpdated = new Date();
            await existingCart.save();
        } else {
            const newCart = new UserCart({
                userId: userId,
                cartItems: cartItems
            });
            await newCart.save();
        }
        
        res.json({
            success: true,
            message: 'Cart saved successfully'
        });
    } catch (error) {
        console.error('Error saving cart:', error);
        res.json({
            success: false,
            error: 'Failed to save cart'
        });
    }
});

// Clear user cart
app.post('/cart/clear', async (req, res) => {
    try {
        const { userId } = req.body;
        
        if (!userId) {
            return res.json({
                success: false,
                error: 'User ID is required'
            });
        }

        await UserCart.findOneAndUpdate(
            { userId: userId },
            { cartItems: {}, lastUpdated: new Date() },
            { upsert: true }
        );
        
        res.json({
            success: true,
            message: 'Cart cleared successfully'
        });
    } catch (error) {
        console.error('Error clearing cart:', error);
        res.json({
            success: false,
            error: 'Failed to clear cart'
        });
    }
});

// API for get single product details
app.get('/product/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ id: Number(req.params.id) });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.listen(port, (error)=>{
    if(!error){
        console.log("Server running on port "+port);
        
    }else{
        console.log("Error: "+error);
        
    }
})