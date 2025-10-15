# E-Commerce Website - MERN Stack

A full-stack e-commerce application built with the MERN stack, featuring user authentication via Auth0, PayPal payment integration, and an admin panel for product management.

## 🚀 Features

### Core Features
- ✅ **Product Catalog**: View all products with detailed information
- ✅ **Product Details**: Individual product pages with comprehensive details
- ✅ **Shopping Cart**: Add, view, and manage items in cart
- ✅ **User Authentication**: Secure login/signup using Auth0
- ✅ **Payment Integration**: PayPal payment processing
- ✅ **Admin Panel**: Product management interface for administrators

### Technical Features
- **Frontend**: React.js with modern hooks and routing
- **Backend**: Node.js/Express.js REST API
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Auth0 integration
- **Payments**: PayPal REST SDK
- **State Management**: React Context/Hooks
- **UI/Animation**: Framer Motion for smooth animations

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│   Frontend      │◄──►│   Backend       │◄──►│   Database      │
│   (React)       │    │   (Express)     │    │   (MongoDB)     │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │
│   Auth0         │    │   PayPal API    │
│   (Authentication)   │   (Payments)    │
│                 │    │                 │
└─────────────────┘    └─────────────────┘

┌─────────────────┐
│                 │
│   Admin Panel   │
│   (Vite+React)  │
│                 │
└─────────────────┘
```

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)
- **Git**

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd ecommerce-website
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment variables file
touch .env
```

Add the following environment variables to your `.env` file:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/ecommerce
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here

# Auth0 Configuration (if used in backend)
AUTH0_DOMAIN=your-auth0-domain
AUTH0_CLIENT_ID=your-auth0-client-id
AUTH0_CLIENT_SECRET=your-auth0-client-secret

# PayPal Configuration
PAYPAL_CLIENT_ID=your-paypal-client-id
PAYPAL_CLIENT_SECRET=your-paypal-client-secret
PAYPAL_MODE=sandbox # or 'live' for production
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from root)
cd frontend

# Install dependencies
npm install

# Create environment variables file
touch .env
```

Add the following environment variables to your frontend `.env` file:

```env
# Auth0 Configuration
REACT_APP_AUTH0_DOMAIN=your-auth0-domain
REACT_APP_AUTH0_CLIENT_ID=your-auth0-client-id
REACT_APP_AUTH0_REDIRECT_URI=http://localhost:3000

# API Configuration
REACT_APP_API_URL=http://localhost:5000/api

# PayPal Configuration
REACT_APP_PAYPAL_CLIENT_ID=your-paypal-client-id
```

### 4. Admin Panel Setup

```bash
# Navigate to admin directory (from root)
cd admin

# Install dependencies
npm install

# Create environment variables file (if needed)
touch .env
```

Add environment variables to admin `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

## 🚀 Running the Application

### Development Mode

You'll need to run all three parts of the application:

#### 1. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# If using local MongoDB
sudo systemctl start mongod
# or
brew services start mongodb/brew/mongodb-community
```

#### 2. Start Backend Server
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:5000`

#### 3. Start Frontend Application
```bash
cd frontend
npm start
```
Frontend will run on `http://localhost:3000`

#### 4. Start Admin Panel
```bash
cd admin
npm run dev
```
Admin panel will run on `http://localhost:5173` (Vite default)

## 📁 Project Structure

```
ecommerce-website/
├── backend/                 # Express.js backend
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── config/             # Configuration files
│   └── index.js            # Server entry point
├── frontend/               # React.js frontend
│   ├── public/             # Public assets
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React Context
│   │   ├── services/       # API services
│   │   └── App.js          # Main App component
│   └── package.json
├── admin/                  # Admin panel (Vite + React)
│   ├── src/
│   │   ├── components/     # Admin components
│   │   ├── pages/          # Admin pages
│   │   └── main.jsx        # Entry point
│   └── package.json
└── README.md
```

## 🔧 Configuration

### Auth0 Setup
1. Create an Auth0 account at [auth0.com](https://auth0.com)
2. Create a new application (Single Page Application)
3. Configure allowed callback URLs: `http://localhost:3000`
4. Configure allowed logout URLs: `http://localhost:3000`
5. Copy Domain and Client ID to your environment variables

### PayPal Setup
1. Create a PayPal Developer account at [developer.paypal.com](https://developer.paypal.com)
2. Create a new application in the sandbox
3. Copy Client ID and Client Secret to your environment variables
4. For production, switch to live mode and use live credentials

## 🧪 Testing

### Backend API Testing
Use Postman or similar tools to test API endpoints:

```bash
# Get all products
GET http://localhost:5000/api/products

# Get single product
GET http://localhost:5000/api/products/:id

# Add to cart (requires authentication)
POST http://localhost:5000/api/cart/add
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 📦 Build for Production

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
# Serve the build folder using a static server
```

### Admin Panel
```bash
cd admin
npm run build
# Serve the dist folder using a static server
```

## 🔍 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/remove/:id` - Remove item from cart

### Payment
- `POST /api/payment/create` - Create PayPal payment
- `POST /api/payment/execute` - Execute PayPal payment

## 🚨 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env` file
   - Verify network access for MongoDB Atlas

2. **Auth0 Authentication Issues**
   - Verify Auth0 domain and client ID
   - Check callback URLs configuration
   - Ensure HTTPS in production

3. **PayPal Integration Issues**
   - Verify PayPal credentials
   - Check sandbox vs live mode settings
   - Ensure proper PayPal SDK initialization

4. **CORS Issues**
   - Verify backend CORS configuration
   - Check frontend API URL configuration
  
## Thank You
