# 🎤 1-Minute Explaining Project

"I built a full-stack MERN application for the technical test, with a React frontend and a Node/Express backend connected to MongoDB Atlas.  
The frontend, deployed on Vercel, has a simple email form where users can submit their name, email, and message — the email input is validated using the `validator` npm package before submission.  
There’s also an admin page that retrieves and displays all submitted entries in a table, fetching the data securely from the backend.  
The backend is deployed on Render and handles API requests through a well-structured Express server with separated layers — including `server.js` for starting the server, `app.js` for middlewares, `userRoutes` for defining endpoints, and `userController` for database interactions.  
I managed environment variables properly, using `.env` files for both frontend and backend, and handled CORS issues cleanly with middleware configuration.  
The code is well-documented, clean, and organized with clear comments, making it easy for others to understand and extend the project.  
To run the project locally, it just requires installing dependencies and running both servers with `npm run dev`.  
Overall, I focused not only on functionality but also on writing production-ready, maintainable code."

_"I'd be happy to walk you through the codebase or show you how I structured the project if you'd like."_

# 📄 Project Overview

**Tech Stack**:

- **Frontend**: React (with Vite), deployed on **Vercel**
- **Backend**: Node.js + Express.js, deployed on **Render**
- **Database**: MongoDB Atlas (cloud)
- **Other**: CORS handling, validation (npm `validator` package), react-toastify, dotenv for environment variables.

---

# ⚙️ Project Structure

### Frontend (React app)

- **Form Page**: Collects user name, email (validated with `validator`), and a message.
- **Admin Page**: Retrieves all users from backend API and displays them in a table.

### Backend (Node.js/Express app)

- **server.js**:
  - Starts the server.
  - Loads environment variables.
- **app.js**:
  - Handles all middlewares (CORS, body parsing, logging).
  - Connects routes.
- **routes/userRoutes.js**:
  - `POST /api/v1/email-list` — create a new email entry.
  - `GET /api/v1/email-list` — get all email entries.
- **controllers/userController.js**:
  - Logic to handle creating and retrieving users.

---

# 🌎 Deployment Details

| Part     | Platform      | URL Example                           |
| -------- | ------------- | ------------------------------------- |
| Frontend | Vercel        | https://email-list-weld.vercel.app/   |
| Backend  | Render        | https://email-list-n31j.onrender.com/ |
| Database | MongoDB Atlas | Using `DATABASE` connection string    |

---

# 🔑 Environment Variables

### Frontend (`.env`)

```plaintext
VITE_API_BASE_URL=http://localhost:3000/
```

- Change `VITE_API_BASE_URL` to your deployed backend URL when deploying (for Vercel Production environment).

Example for production:

```plaintext
VITE_API_BASE_URL=https://email-list-n31j.onrender.com/
```

---

### Backend (`.env`)

```plaintext
NODE_ENV=development
PORT=3000
USER= write here...
DATABASE= write here...
DATABASE_LOCAL= write here...
DATABASE_PASSWORD= write here...
```

- `DATABASE` is the cloud MongoDB URL, with `<PASSWORD>` placeholder to be replaced by `DATABASE_PASSWORD`.

You should typically connect like this inside your backend:

```javascript
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);
```

---

# 🛠 How to Run Locally

1. Clone the repo.
2. Navigate to `frontend` and `backend` folders separately.
3. Install dependencies:

```bash
# In frontend
npm install

# In backend
npm install
```

4. Create `.env` files in both frontend and backend folders (sample above).
5. Run both servers:

```bash
# In frontend
npm run dev

# In backend
npm run dev
```

Frontend runs by default on `http://localhost:5173/`, backend on `http://localhost:3000/`.

---

# 🛡 Notes / Best Practices

- CORS middleware configured properly.
- Validation of emails done on frontend before sending.
- Good separation of concerns (Controller / Routes / Server structure).
- API URL is dynamically loaded via `VITE_API_BASE_URL`, making frontend environment-agnostic.
- MongoDB Atlas used for production database (can fall back to local MongoDB if needed).
