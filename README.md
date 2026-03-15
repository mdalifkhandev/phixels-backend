# ⚙️ Phixels.io - Scalable Backend API

The Phixels.io Backend is the high-performance engine powering both the company's public website and its content management system. It provides a robust, secure, and developer-friendly API for managing enterprise digital content.

- **Live API**: [phixels-backend.vercel.app](https://phixels-backend.vercel.app)

---

## 🚀 Key Features

### 🏗️ Clean & Modular Architecture
- **Layered MCS Design**: Follows a strict Model-Controller-Service pattern to ensure high maintainability, testability, and separation of concerns.
- **Scalable Content Module**: A robust system designed to store and serve serialized rich-text HTML data, supporting dynamic section updates across the entire ecosystem.
- **Automated Seeding Systems**: Integrated node scripts for rapid database population and consistent environment setup.

### 🔐 Security & Data Integrity
- **JWT Authentication**: Secure, token-based access control for all administrative and content-management endpoints.
- **Zod Validation**: Comprehensive schema validation for all incoming requests, ensuring data reliability and preventing system errors.
- **Bcrypt Protection**: Industry-standard hashing for sensitive user data and credentials.

### 📂 Cloud Media & Storage
- **Cloudinary Integration**: Fully automated, cloud-based image processing and storage via `multer-storage-cloudinary`.
- **Atomic Persistence**: Optimized MongoDB operations (using Mongoose) for reliable data updates and content versioning.

---

## 🛠️ Technical Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript (Strongly typed architecture)
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Zod
- **Media Hosting**: Cloudinary

---

## ⚙️ How It Works

1.  **Processing Pipeline**: Incoming requests pass through global middleware for logging, security, and error handling before reaching the router.
2.  **Service-Oriented Logic**: The controller delegates business logic to the service layer, keeping the API layer clean.
3.  **Dynamic Data Handling**: The system processes rich HTML strings and section-based identifiers to serve the correct content to both the web and admin platforms.
4.  **Response Standardization**: All API responses are wrapped in a consistent format for predictable frontend consumption.

---

## 📦 Installation & Setup

```bash
# Clone and navigate
git clone https://github.com/mdalifkhandev/phixels.io-backend.git
cd phixels.io-backend

# Install dependencies
npm install

# Setup environment
# Refer to .env.example for required keys
npm run dev
```

---

*This project highlights my skills in backend systems design, secure API development, and cloud integration.*
