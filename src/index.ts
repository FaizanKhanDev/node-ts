import express from 'express';
import dotenv from 'dotenv';
import  connectDB  from './configs/db';

/* ====== TypeScript with Express ====== */


/* ====== Config ====== */
dotenv.config();
/* ==== Server Setup ==== */
const app = express();



/* ====== Database Connection ====== */
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017';
connectDB(DATABASE_URL);

/* ====== PORT ====== */
const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});





/* ====== Server Start ====== */
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});