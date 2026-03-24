# srijan-capstone-frontend_storefront
# BookBazaar - The Storefront
 
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/tailwind_css-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Microservices](https://img.shields.io/badge/Architecture-Microservices-blue.svg?style=for-the-badge)
 
BookBazaar is a modern, full-featured e-commerce storefront designed to work with a microservices-based backend. It provides a complete user experience from browsing and searching for products to user authentication, cart management, checkout, and a comprehensive admin panel.
 
---
 
## Features
 
This application is feature-rich, catering to public users, authenticated customers, and administrators.
 
#### 🌐 **Public & Customer Features**
- **AI-Powered Search:** Integrated with a Coveo-based microservice for fast, relevant search results and search-as-you-type suggestions.
- **Dynamic Product Catalog:** Browse all books with category and price filtering.
- **Detailed Product Pages:** View individual book details, including stock availability.
- **Shopping Cart:** Full-featured cart using React Context for state management.
- **User Authentication:** Secure login and registration flow managed by a dedicated auth service.
- **Checkout & Payment:** Seamless checkout process that integrates with a payment provider (Stripe).
- **Order History:** Authenticated users can view their past orders and details.
- **Account Management:** Users can view their profile and change their password.
- **Content-Driven Pages:** About and Contact pages are powered by a headless CMS (Contentstack).
 
#### 👑 **Admin Features**
- **Admin-Only Routing:** Protected routes ensure only users with an 'ADMIN' role can access the dashboard.
- **Comprehensive Dashboard:** At-a-glance view of total users, books, orders, and revenue.
- **User Management:** View and manage all registered users.
- **Order Management:** View all customer orders and update their status (e.g., PENDING, SHIPPED, DELIVERED).
- **Product Management:**
    - Add new books to the catalog.
    - Edit existing book details.
    - Delete books from the system.
 
---
 
## Tech Stack & Architecture
 
This project is built with a modern frontend stack and designed for scalability and maintainability.
 
- **Framework:** **React** (with Vite for a fast development experience).
- **Routing:** **React Router v6** for client-side routing.
- **Styling:** **Tailwind CSS** for a utility-first styling approach.
- **State Management:** **React Context API** for global state (Authentication, Shopping Cart).
- **Notifications:** **React Toastify** for user-friendly feedback.
- **Icons:** **Lucide React** for a clean and consistent icon set.
- **Architecture:**
    - **Component-Based:** Following React best practices.
    - **Service Layer:** API calls are abstracted into a dedicated `services` directory, separating business logic from UI components.
    - **Context Providers:** Global state for Auth and Cart is cleanly managed and provided to the entire application.
 
---
 
## 🚀 Getting Started
 
Follow these instructions to get the project up and running on your local machine.
 
### Prerequisites
 
- **Node.js** (v18.x or higher)
- **npm** or **yarn**
- **Running Backend Services:** This is a frontend-only application. It requires the following backend microservices to be running and accessible:
    - Authentication Service
    - User Service
    - Product Service
    - Order Service
    - **Search Service (Coveo)**
 
### Installation & Setup
 
1.  **Clone the repository:**
    ```bash
    git clone [your-repository-url]
    cd srijan-capstone-frontend_storefront-integrated
    ```
 
2.  **Install dependencies:**
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```
 
3.  **Set up environment variables:**
    Create a `.env` file in the root of the project by copying the example file:
    ```bash
    cp .env.example .env
    ```
    Now, open the `.env` file and fill in your API keys from your Contentstack account.
 
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000` (or another port if 3000 is busy).
 
### Environment Variables
 
Your `.env` file needs to contain the API keys for the Contentstack CMS, which powers the content on the About and Contact pages.
 
```env
# .env.example
 
# Contentstack Keys for the "About Us" page content
VITE_CONTENTSTACK_ABOUT_API_KEY=your_about_page_api_key
VITE_CONTENTSTACK_ABOUT_DELIVERY_TOKEN=your_about_page_delivery_token
VITE_CONTENTSTACK_ABOUT_ENVIRONMENT=your_environment_name
 
# Contentstack Keys for the "Contact Us" page content
VITE_CONTENTSTACK_CONTACT_API_KEY=your_contact_page_api_key
VITE_CONTENTSTACK_CONTACT_DELIVERY_TOKEN=your_contact_page_delivery_token
VITE_CONTENTSTACK_CONTACT_ENVIRONMENT=your_environment_name
Use code with caution.
Markdown
📂 Project Structure
The project follows a logical and scalable folder structure.
Generated code
srijan-capstone-frontend_storefront-integrated/
├── public/              # Static assets
└── src/
    ├── assets/          # Images, SVGs, etc.
    ├── components/      # Reusable UI components (Navbar, Footer, ProductCard)
    ├── context/         # React Context providers (AuthProvider, CartProvider)
    ├── data/            # Mock data (used for initial development)
    ├── layout/          # Layout components (e.g., AuthLayout)
    ├── pages/           # Top-level page components for each route
    ├── routes/          # Custom route components (PrivateRoute, AdminRoute)
    ├── services/        # API service layer for communicating with the backend
    ├── utils/           # Utility functions and helpers (apiClient, contentstack config)
    ├── App.jsx          # Main application component with routing
    ├── main.jsx         # Application entry point
    └── index.css        # Tailwind CSS setup
Use code with caution.
API Endpoints
This frontend application is designed to communicate with a set of backend microservices, likely orchestrated through an API Gateway. The key endpoints it consumes are:
Search Service (http://localhost:1115)
GET /api/v1/search?q={query}: Fetches search results for a given query.
GET /api/v1/search/suggest?q={query}: Provides search-as-you-type suggestions.
Authentication Service
POST /authservice/api/v1/authentication/users/register: Registers a new user.
POST /authservice/api/v1/authentication/users/login: Logs in a user and returns a token.
PUT /authservice/api/v1/auth/change-password: Allows an authenticated user to change their password.
Product Service
GET /productservice/api/v1/products: Fetches a paginated list of all books.
GET /productservice/api/v1/products/{id}: Fetches details for a single book.
POST /productservice/api/v1/products: (Admin) Adds a new book.
PUT /productservice/api/v1/products/{id}: (Admin) Updates an existing book.
DELETE /productservice/api/v1/products/{id}: (Admin) Deletes a book.
Order & Payment Service
POST /orderservice/api/v1/orders: (User) Places a new order.
GET /orderservice/api/v1/orders/history: (User) Gets the order history for the logged-in user.
GET /orderservice/api/v1/orders/{id}: (User/Admin) Gets details for a specific order.
POST /orderservice/api/v1/payments/create-checkout-session: Creates a Stripe payment session.
GET /orderservice/api/v1/orders/admin/all: (Admin) Gets a paginated list of all orders in the system.
PUT /orderservice/api/v1/orders/{orderId}/status: (Admin) Updates the status of an order.
User Service
GET /userservice/api/v1/users: (Admin) Fetches all registered users.
GET /userservice/api/v1/users/{id}: (Admin) Fetches details for a specific user.
DELETE /userservice/api/v1/users/{id}: (Admin) Deletes a user.
Build & Deployment
To create a production-ready build of the application, run the following command:
Generated bash
npm run build
Use code with caution.
Bash
This will create a dist directory in your project root containing optimized, static HTML, CSS, and JavaScript files.
You can then serve this dist folder using any static file server (like Nginx, Vercel, Netlify, or an AWS S3 bucket configured for web hosting).
License
This project is licensed under the MIT License. See the LICENSE file for more details.
 