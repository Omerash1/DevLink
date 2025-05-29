# DevLink - Personal Link Manager

<p align="center">
  <img src="frontend/public/logo.png" alt="DevLink Logo" width="200"/>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#demo">Live Demo</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#api">API</a> •
  <a href="#roadmap">Roadmap</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#license">License</a>
</p>

DevLink is a full-stack web application for organizing and managing your web links in one central place. Save important URLs, organize with tags, add notes, and set reminders - all in a clean, intuitive interface.

## Features

- 🔐 **User Authentication**: Secure signup/login system
- 🔗 **Link Management**: Save, categorize, and organize important links
- 🏷️ **Custom Tags**: Create and assign custom tags with colors
- 📝 **Notes**: Add detailed notes to each saved link
- 🔔 **Reminders**: Set reminders to revisit important links
- 🔍 **Search & Filter**: Quickly find links with powerful search
- 🌓 **Dark/Light Mode**: Choose your preferred theme
- 📱 **Responsive Design**: Works seamlessly on all devices

## Demo

Try the live demo: [https://devlink-demo.vercel.app](https://devlink-demo.vercel.app)

**Demo Credentials:**
- Email: demo@example.com
- Password: demopassword

![DevLink Dashboard](screenshots/dashboard.png)

## Tech Stack

### Frontend
- Vue 3 with Composition API
- TypeScript for type safety
- Vue Router for navigation
- Pinia for state management
- TailwindCSS for styling
- Axios for API requests

### Backend
- Node.js with Express
- TypeScript
- JWT for authentication
- MongoDB with Mongoose

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## Installation

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB (local or Atlas)

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/devlink.git
cd devlink/backend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Start development server
npm run dev
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your backend URL

# Start development server
npm run dev
```

## Usage

1. Register a new account or login
2. Click "Add Link" to save a new webpage
3. Organize links with custom tags
4. Add notes to provide context for saved links
5. Set reminders for links you want to revisit
6. Use the search bar to find specific links
7. Filter links by tags, favorites, or date added

## API

DevLink provides a RESTful API:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register` | POST | Register a new user |
| `/api/auth/login` | POST | Authenticate user |
| `/api/auth/me` | GET | Get current user data |
| `/api/links` | GET | Get all links for current user |
| `/api/links` | POST | Create a new link |
| `/api/links/:id` | GET | Get a specific link |
| `/api/links/:id` | PUT | Update a link |
| `/api/links/:id` | DELETE | Delete a link |
| `/api/tags` | GET | Get all tags for current user |
| `/api/tags` | POST | Create a new tag |
| `/api/tags/:id` | PUT | Update a tag |
| `/api/tags/:id` | DELETE | Delete a tag |

## Roadmap

Future improvements planned for DevLink:

- [ ] **Browser Extension**: Chrome extension to save links directly from any page
- [ ] **Link Previews**: Generate and display thumbnails/previews for links
- [ ] **Link Health Checker**: Periodically verify if saved links are still valid
- [ ] **Export/Import**: Allow exporting/importing links as JSON or CSV
- [ ] **Reading Time Estimate**: Calculate and display estimated reading time for articles
- [ ] **Social Sharing**: Share collections of links with others
- [ ] **OAuth Integration**: Login with Google, GitHub, etc.
- [ ] **Public Profile**: Create a public page of selected links to share
- [ ] **Analytics Dashboard**: Track which links you visit most often
- [ ] **Progressive Web App (PWA)**: Make the app installable on devices
- [ ] **Keyboard Shortcuts**: Add keyboard navigation for power users
- [ ] **Link Collections**: Group links into collections or projects

## Project Structure

```
devlink/
├── backend/                 # Node.js Express backend
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Middleware functions
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── scripts/         # Utility scripts
│   │   ├── types/           # TypeScript types
│   │   ├── utils/           # Utility functions
│   │   └── app.ts           # Express app setup
│   ├── .env                 # Environment variables
│   └── package.json
│
├── frontend/                # Vue 3 frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/          # Static assets
│   │   ├── components/      # Vue components
│   │   ├── router/          # Vue Router
│   │   ├── stores/          # Pinia stores
│   │   ├── services/        # API services
│   │   ├── types/           # TypeScript types
│   │   ├── utils/           # Utility functions
│   │   ├── views/           # Page components
│   │   ├── App.vue          # Root component
│   │   └── main.ts          # Entry point
│   ├── .env                 # Environment variables
│   └── package.json
│
└── README.md
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by OmerA(https://github.com/omerash1)