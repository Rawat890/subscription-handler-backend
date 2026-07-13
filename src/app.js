import express from "express";
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json(), express.urlencoded({ extended: true }));

export default app;