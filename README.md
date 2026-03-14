# ⚙️ Phixels.io - Scalable Backend API

The Phixels.io Backend is the high-performance engine powering both the company's public website and its content management system. It provides a robust, secure, and developer-friendly API for managing enterprise digital content.

---

## 🎯 Purpose and Vision
The backend was developed as a centralized source of truth for all Phixels.io data. The primary objective was to build a clean, modular architecture that supports dynamic content retrieval, secure administration, and seamless media handling, ensuring that the front-facing website can scale and evolve without database-level complexity.

---

## 🚀 Key Features

### 🏗️ Clean & Modular Architecture
- **Layered Design**: Implemented a separation of concerns with Model-Control-Service (MCS) patterns to ensure maintainability and testability.
- **RESTful API**: Intuitive and standard-compliant endpoints for `PageContent`, `Blogs`, `Subscribers`, and `Metrics`.
- **Zod Validation**: Strict schema validation for all incoming requests, preventing data corruption and ensuring API reliability.

### 🔐 Security & Identity
- **JWT Authentication**: Secure access control for admin endpoints using JSON Web Tokens.
- **Bcrypt Encryption**: Industry-standard password hashing for user accounts.
- **CORS & Rate Limiting**: Protection against unauthorized cross-origin requests and basic abuse prevention.

### 📂 Advanced Media & Content Management
- **Cloudinary Integration**: Fully automated image processing and cloud storage through `multer-storage-cloudinary`.
- **Dynamic Content Module**: A specialized schema designed to hold rich HTML content from the editor while maintaining section-based organization for the frontend.

---

## 🛠️ Technical Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript (with strong typing across all entities)
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Zod
- **Media**: Cloudinary SDK & Multer
- **Environment**: Dotenv for secure configuration

---

## ⚙️ How It Works

1.  **Request Pipeline**: Requests pass through a Global Error Handler and a specialized Router that distributes them to specific modules.
2.  **Logic Processing**: The controller invokes the service layer, which contains the core business logic (e.g., finding or updating page sections).
3.  **Data Persistence**: Mongoose interacts with MongoDB to perform atomic operations like `findOneAndUpdate` with `upsert` support.
4.  **Response Handling**: Standardized response wrappers ensure a consistent data format for both the React frontend and the dashboard.

---

## 📦 Installation & Setup

```bash
# Clone and navigate
git clone https://github.com/mdalifkhandev/phixels.io-backend.git
cd phixels.io-backend

# Install dependencies
npm install

# Setup environment
# Create a .env file based on the provided configuration variables
PORT=5000
DATABASE_URL=your_mongodb_url
JWT_SECRET=your_secret

# Run development server
npm run dev
```

---

*This project highlights my skills in backend systems design, secure API development, and cloud integration.*
