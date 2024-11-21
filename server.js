// server.js
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';

const app = express();
const port = 5000;

app.use(cors());

// Ensure the uploads directory exists
import fs from 'fs';
const uploadDir = path.join(__dirname, 'public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads'); // Save files to 'public/uploads' directory
  },
  filename: function (req, file, cb) {
    // Use the original name set in the client
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// File upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ message: 'File uploaded successfully', file: req.file });
});

// Serve static files from the public directory
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
