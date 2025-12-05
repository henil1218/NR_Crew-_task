# E-Commerce Store

A modern e-commerce application built with React, featuring product listing and shopping cart functionality.

## Features

- **Product Listing Page**: Browse through a collection of products with add-to-cart functionality
- **Shopping Cart**: View cart items, update quantities, remove items, and see total price
- **Global State Management**: Uses React Context API for cart state management
- **Responsive Design**: Built with Bootstrap 5 for a mobile-friendly experience
- **Clean Architecture**: Well-organized folder structure with separation of concerns

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.js       # Navigation bar with cart badge
│   └── ProductCard.js   # Product card component
├── context/            # Context API
│   └── CartContext.js  # Cart state management
├── data/               # Static data
│   └── products.js     # Product data
├── pages/              # Page components
│   ├── ProductListing.js  # Product listing page
│   └── Cart.js         # Shopping cart page
├── App.js              # Main app component with routing
├── App.css             # App-specific styles
├── index.js            # Entry point
└── index.css           # Global styles
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technologies Used

- **React 18**: UI library
- **React Router DOM**: Client-side routing
- **Bootstrap 5**: CSS framework for styling
- **Context API**: Global state management for cart

## Features in Detail

### Cart Functionality

- Add products to cart
- Update item quantities
- Remove items from cart
- Calculate total price automatically
- View total number of items in cart badge

### State Management

The cart state is managed globally using React Context API, allowing:
- Access to cart from any component
- Persistent cart state across navigation
- Centralized cart operations

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm build`: Builds the app for production
- `npm test`: Launches the test runner


