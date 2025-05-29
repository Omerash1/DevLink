# DevLink - Personal Link Manager

<p align="center">
  <img src="frontend/public/logo.png" alt="DevLink Logo" width="200"/>
</p>

DevLink is a full-stack web application for organizing and managing web resources. Built to demonstrate modern web development skills and architecture practices.

## Tech Stack

### Frontend
- **Vue 3** with Composition API & TypeScript
- **TailwindCSS** for styling
- **Pinia** for state management
- Dark/Light mode support

### Backend
- **Node.js** with Express & TypeScript 
- **MongoDB** with Mongoose
- JWT Authentication

### Unique Features
- **Python Microservice**: URL analysis for metadata extraction and tag suggestions
- **PHP Analytics Dashboard**: Usage statistics visualization

## Installation & Setup

### Prerequisites
- Node.js (v16+)
- MongoDB account
- Python 3.8+ (for URL analysis)
- PHP 7.4+ (for analytics)

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env  # Edit with your MongoDB URI and JWT secret
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

### Python Service (Optional)
```bash
cd backend/python-service
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### PHP Analytics (Optional)
```bash
# Configure your web server to serve the PHP files
# Or use PHP's built-in server:
cd backend/php-analytics
php -S localhost:8001
```

## Features

- 🔐 **User Authentication**: Secure signup/login with JWT
- 🔗 **Link Management**: Save, edit, and organize web resources
- 🏷️ **Custom Tags**: Create and assign colorful tags
- 📝 **Notes & Description**: Add context to saved links
- 🔍 **Search & Filter**: Quickly find specific links
- 🌓 **Dark/Light Mode**: Choose your preferred theme
- 📱 **Responsive Design**: Works on all devices
- 🔮 **URL Analysis**: Python-powered metadata extraction
- 📊 **Usage Analytics**: PHP-based statistics dashboard

## Project Structure

This project demonstrates a modern, multi-language architecture:
- **Vue.js**: Frontend user interface
- **Node.js**: Main API backend
- **MongoDB**: Data persistence
- **Python**: Intelligent URL analysis
- **PHP**: Analytics and statistics

---

Built by OmerA(https://github.com/omerash1)