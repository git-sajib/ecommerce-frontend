# Ecommerce Frontend

A modern **Next.js 15** ecommerce frontend built with **React**, **TypeScript**, **Tailwind CSS**, and **Shadcn UI**. The application integrates with the Laravel backend through a RESTful API and provides a complete ecommerce shopping experience including authentication, product browsing, category hierarchy, shopping cart, checkout, Stripe payment, and an admin dashboard.

---

# Features

- User Authentication
- Role-Based Access Control (Admin & Customer)
- Product Catalog
- Category Hierarchy (DFS Tree)
- Product Details
- Shopping Cart
- Checkout
- Stripe Payment Integration
- Order History
- Payment History
- Admin Dashboard
- Responsive Design
- Protected Routes
- API Integration with Laravel Backend

---

# Technology Stack

| Technology      | Version |
| --------------- | ------- |
| Next.js         | 15      |
| React           | 19      |
| TypeScript      | Latest  |
| Tailwind CSS    | Latest  |
| Shadcn UI       | Latest  |
| Axios           | Latest  |
| Zustand         | Latest  |
| React Hook Form | Latest  |
| Zod             | Latest  |

---

# Project Structure

```
app/
├── admin/
├── cart/
├── categories/
├── checkout/
├── login/
├── orders/
├── payment/
├── payments/
├── products/
├── register/

components/
├── auth/
├── cart/
├── category/
├── layout/
├── payment/
├── product/
├── providers/
└── ui/

hooks/

services/

store/

types/
```

---

# Installation

Clone the repository

```bash
git clone <frontend-repository-url>
```

Navigate to project

```bash
cd ecommerce-frontend
```

Install dependencies

```bash
npm install
```

Create environment file

```bash
cp .env.example .env.local
```

Start development server

```bash
npm run dev
```

Build production

```bash
npm run build
```

Start production server

```bash
npm start
```

---

# Environment Variables

Create `.env.local`

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api/v1
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

---

# Backend API

Default Backend URL

```
http://127.0.0.1:8000/api/v1
```

---

# Authentication

- Login
- Registration
- JWT Token Authentication
- Protected Routes
- Automatic Logout on Unauthorized Request

---

# User Features

- Register
- Login
- Browse Categories
- Browse Products
- View Product Details
- Add Products to Cart
- Checkout
- Stripe Payment
- View Orders
- View Payments

---

# Admin Features

- Dashboard
- Category Management
- Product Management
- Order Monitoring
- Payment Monitoring

---

# API Services

The frontend communicates with the Laravel backend using Axios.

Example services include:

- Authentication
- Categories
- Products
- Orders
- Payments

---

# State Management

Global state is managed using **Zustand**.

State includes:

- Authentication
- Shopping Cart
- User Session

---

# Form Validation

Forms are implemented using:

- React Hook Form
- Zod Validation

---

# UI Components

Built using:

- Shadcn UI
- Tailwind CSS

Reusable components include:

- Cards
- Tables
- Dialogs
- Forms
- Inputs
- Tabs
- Dropdowns
- Sheets
- Skeleton Loaders
- Alerts

---

# Pages

- Home
- Login
- Register
- Categories
- Products
- Product Details
- Cart
- Checkout
- Payment
- Orders
- Payments
- Admin Dashboard

---

# Security

- Protected Routes
- JWT Authentication
- Role-Based Authorization
- Input Validation
- Secure API Communication

---

# Future Improvements

- Wishlist
- Product Search
- Product Reviews
- Inventory Dashboard
- Email Notifications
- Dark Mode
- Multi-language Support
- PWA Support

---

# Backend Repository

The frontend communicates with the Laravel REST API backend.

Backend Repository:

```
<backend-repository-url>
```

---

# Developed By

**Samiul Islam**

Backend & Frontend Developer

**Next.js • TypeScript • Tailwind CSS • Zustand • Axios**
