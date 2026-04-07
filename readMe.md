 NodeNest (Backend)

A fully functional backend for a note-taking application where users can create, update, and manage notes with optional image uploads.



🚀 Features

🔐 User Authentication (Signup, Login, Logout)
👤 Get User Profile (Protected Route)
📝 Create Notes (Text + Image)
📄 List All Notes
✏️ Update Note Text
🗑️ Delete Note Text
🖼️ Delete Note Image
☁️ Image Upload using Cloudinary
🔒 JWT-based Authorization



🛠️ Tech Stack

Node.js
Express.js
MongoDB + Mongoose
JWT (Authentication)
Multer (File Upload)
Cloudinary (Image Storage)



📂 Project Structure


backend/
│── src/
│   ├── controller/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── lib/
│   └── index.js
│
├── .env
├── .gitignore
├── package.json




 🔐 Authentication Routes

| Method | Endpoint | Description        |
| ------ | -------- | ------------------ |
| POST   | /signup  | Register new user  |
| POST   | /login   | Login user         |
| GET    | /profile | Get logged-in user |
| POST   | /logout  | Logout user        |



📝 Notes Routes

| Method | Endpoint             | Description                 |
| ------ | -------------------- | --------------------------- |
| POST   | /add                 | Add new note (text + image) |
| GET    | /list                | Get all notes               |
| PUT    | /updateText/:id      | Update note text            |
| PUT    | /deleteNoteText/:id  | Remove note text            |
| PUT    | /deleteNoteImage/:id | Remove note image           |



📦 Installation


git clone https://github.com/your-username/your-repo.git
cd backend
npm install



⚙️ Environment Variables

Create a `.env` file in root:


PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret



▶️ Run the Server


npm run dev



🖼️ Image Upload Flow

Image is uploaded using Multer (memoryStorage)
Converted to stream
Uploaded to Cloudinary
URL stored in MongoDB



🔒 Protected Routes

All note routes require JWT token:


Authorization: Bearer <token>



💡 Future Improvements

Rate limiting
Input validation (Joi/Zod)
Pagination for notes
Folder-based Cloudinary optimization
Logging & monitoring



