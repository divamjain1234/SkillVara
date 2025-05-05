# SkillVara
A full-stack job portal with modern UI/UX, built using the MERN stack (MongoDB, Express, React, Node.js). Users can sign up, log in, create profiles, browse jobs, and apply. Employers can post jobs (upcoming feature). Built with scalability and clean code architecture in mind.
## 🌟 Features

### **Backend (Node.js/Express)**
- **JWT Authentication**  
  - Secure user signup/login with password hashing
  - `isLoggedIn` middleware for protected routes
  - Cookie-based logout system
- **Job Management APIs**  
  - Create/fetch jobs (`GET /api/jobs`, `POST /api/jobs`)
  - View job details (`GET /api/jobs/:id`)
- **Profile Management**  
  - CRUD operations for user profiles
  - Fetch profiles (`GET /api/profiles`)
- **Models**  
  - MongoDB schemas for `User`, `Job`, `Profile`
- **Structured Routing**  
  - Organized `routes/` (userRoutes, jobRoutes)
  - Clean `app.js` with middleware pipeline

### **Frontend (React)**
- **Modern UI with Tailwind CSS**  
  - Responsive design for all devices
- **Authentication Flow**  
  - Login/Signup pages with `react-hook-form`
  - Private routes for authenticated users
- **Dynamic Pages**  
  - Home: Browse all jobs
  - Profile: View/edit user profile
  - Job Details: Full job description
- **State Management**  
  - React Context API for `user`, `isAuthenticated`
  - Centralized data flow
- **Folder Structure**  
src/
├── pages/ # React pages (Home, Login, Profile)
├── components/ # Reusable UI components
├── context/ # Auth context
├── services/ # Axios API calls
└── routes/ # React Router setup

## 🛠️ Tech Stack

**Backend**  
- Node.js | Express | MongoDB | Mongoose | JWT | Cookie-parser | Dotenv | cors

**Frontend**  
- React | Axios | React Router | React Hook Form | Tailwind CSS | Context API

## 🚀 Installation

1. **Clone the repository**
 ```bash
 git clone https://github.com/divamjain1234/SkillVara.git
 cd SkillVara
🚀 Setup & Installation
1. Backend Setup
bash
cd SkillVara/backend

# Install dependencies
npm install

# Set up environment variables (create .env file)
echo "MONGODB_URI=mongodb://localhost:27017/skillvara
JWT_SECRET=your_jwt_secret_here
PORT=3000" > .env

# Start the server
npm run dev
2. Frontend Setup
bash
cd ../frontend

# Install dependencies
npm install

# Start React app
npm run dev

SkillVara/
├── backend/
│   ├── config/         # DB connection
│   ├── controllers/    # Route handlers
│   ├── models/         # MongoDB schemas
│   ├── middleware/     # isLoggedIn, etc.
│   ├── routes/         # API endpoints
│   └── app.js          # Server entry
│
└── frontend/
    ├── public/         # Static assets
    └── src/
        ├── pages/      # React pages
        ├── context/    # Auth state
        ├── services/   # API calls
        └── App.jsx     # Root component



🔜 Upcoming Features
Employer Signup
Dedicated portal for companies to post jobs.

Admin Dashboard
Manage users/jobs with analytics.

Job Posting UI
Form for employers to create job listings.

Search & Filters
Advanced job search by skills, location, etc.

Application Tracking
Users can track applied jobs.

Made with ❤️ by DIVAM JAIN
