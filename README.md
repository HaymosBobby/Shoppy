# Shoppy - React Shopping Cart

A modern, responsive shopping cart application built with React, TypeScript, and Vite. Features include product management, cart functionality, coupon discounts, and a checkout process.

## Features

- 🛍️ Product browsing with grid layout
- 🛒 Shopping cart with real-time updates
- 💵 Coupon system with 10% discount
- 💳 Checkout process with form validation
- 🔔 Toast notifications for user feedback
- 💾 Cart persistence using localStorage
- 📱 Responsive design for all devices

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd shoppy
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage

### Browsing Products

- View products in a responsive grid layout
- Each product card displays:
  - Product image
  - Name
  - Price
  - Description
  - "Add to Cart" button

### Shopping Cart

- Access cart by clicking the cart icon in the header
- Cart features:
  - Add/remove items
  - Adjust quantities
  - Apply coupon codes
  - View total with discounts
  - Proceed to checkout

### Coupon System

- Valid coupon code: `WEB3BRIDGECOHORTx`
- Provides 10% discount on total
- Case-sensitive validation
- Visual feedback for valid/invalid codes

### Checkout Process

1. Review order summary
2. Fill in shipping details:
   - Full name
   - Email
   - Shipping address
3. Enter payment information:
   - Card number (16 digits)
   - Expiry date (MM/YY)
   - CVV (3-4 digits)
4. Place order

## Project Structure
