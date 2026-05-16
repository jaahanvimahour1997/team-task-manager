# 🚀 Team Task Manager (Full-Stack)

A modern, high-end web application for managing projects, assigning tasks, and tracking team productivity with role-based access control.

![TaskFlow Preview](https://via.placeholder.com/1200x600?text=Team+Task+Manager+Premium+UI)

## ✨ Features

- **Premium Design:** Stunning glassmorphism UI with smooth animations and a responsive layout.
- **Authentication:** Secure Signup/Login system with JWT-based persistent sessions.
- **Role-Based Access Control (RBAC):**
  - **Admin:** Full control over project creation, member assignment, and task management.
  - **Member:** Can view the workspace and update the status of assigned tasks.
- **Project Hub:** Create and track active initiatives with member avatars and status indicators.
- **Kanban Task Board:** Organize work with a visual board featuring priority flags and due dates.
- **Interactive Dashboard:** Real-time stats, productivity charts, and recent activity tracking.

## 🛠️ Technology Stack

- **Frontend:** React.js, Tailwind CSS, Vite, React Router, Lucide Icons.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB (Mongoose).
- **Authentication:** JWT (JSON Web Tokens) & Bcrypt.js.
- **Styling:** Custom Design System with HSL tokens.

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB Atlas Account

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jaahanvimahour1997/team-task-manager.git
   cd team-task-manager
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   # Create a .env file and add your MONGO_URI and JWT_SECRET
   npm run dev
   ```

3. **Frontend Setup:**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

## 📄 API Documentation

- `POST /api/auth/signup` - Register a new user (with role).
- `POST /api/auth/login` - Authenticate user and get token.
- `GET /api/projects` - List all projects.
- `POST /api/projects` - Create a new project (Admin).
- `GET /api/tasks` - List all tasks.
- `PATCH /api/tasks/:id/status` - Update task status.
- `GET /api/dashboard` - Get workspace stats.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📜 License

Distributed under the MIT License.
