# 💬 MERN Chat App

A full-stack real-time chat application built with the MERN stack and Socket.io.

## Features
- 🔐 User Authentication (Register / Login) with JWT
- 💬 One-on-One Real-time Messaging
- 👥 Group Chat (Create, Rename, Add/Remove Members)
- 🔔 Real-time Notifications
- ⌨️ Typing Indicators
- 🔍 Search Users
- 👤 View User Profiles
- 🖼️ Profile Picture Upload via Cloudinary

## Tech Stack
- **Frontend:** React.js, Chakra UI, Socket.io-client
- **Backend:** Node.js, Express.js, Socket.io
- **Database:** MongoDB + Mongoose
- **Auth:** JWT + bcryptjs

## Setup Instructions

### 1. Clone the repo
```bash
git clone <your-repo-url>
cd mern-chat-app
```

### 2. Create `.env` in root folder
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

### 3. Install dependencies
```bash
npm install
cd frontend && npm install && cd ..
```

### 4. Run the app
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
cd frontend && npm start
```

Open [http://localhost:3000](http://localhost:3000)
