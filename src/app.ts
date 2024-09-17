import express, { Router } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import DBconnection from './config/config';
import categoriesRoute from './routes/categoriesroute';
import subCategoryRoute from './routes/subCategoryRoute';
import ProuctsRoute from './routes/productsRoute';
import { globalErrorHandler } from './middlewares/globalerrorhandler';
import productsModel from './models/productsModel';
import ApiError from './utils/ApiError';
dotenv.config();
DBconnection();

const app: express.Application = express();
app.use(express.json())

app.use("/api/Products", ProuctsRoute);
app.use("/api/Category", categoriesRoute);
app.use("/api/subCategory", subCategoryRoute);
app.use(function (req, res, next) {
  next(new ApiError("Wrong Route",404));
});
app.use(globalErrorHandler);

const port = process.env.PORT;
console.log(typeof productsModel);
console.log(productsModel);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});