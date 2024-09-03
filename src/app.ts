import express, { Router } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import DBconnection from './config/config';
import categoriesRoute from './routes/categoriesroute';
import subCategoryRoute from './routes/subCategoryRoute';
dotenv.config();
DBconnection();

const app:express.Application = express();
app.use(express.json())
app.use("/api/Category/",categoriesRoute);
app.use("/api/subCategory",subCategoryRoute)
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});