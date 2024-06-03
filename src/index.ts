/* ====== TypeScript with Express ====== */
import express from 'express';
import dotenv from 'dotenv';
import  connectDB  from './configs/db';
import upload from './middlewares/upload-middlware';


/* ====== Config ====== */
dotenv.config();


/* ==== Server Setup ==== */
const app = express();



/* ====== Database URL ====== */
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017';

/* ====== Database Connection ====== */
connectDB(DATABASE_URL);

/* ====== PORT ====== */
const PORT = process.env.PORT || 8000;



/* ====== Routes ====== */
app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});


app.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded successfully!');
});




/* ====== Server Start ====== */
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});