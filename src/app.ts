import express, { Router } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import DBconnection from './config/config';
import categoriesRoute from './routes/categoriesroute';
import subCategoryRoute from './routes/subCategoryRoute';
import { globalErrorHandler } from './middlewares/globalerrorhandler';
import ErrorInterface from './interfaces/ErrorInterface';
dotenv.config();
DBconnection();

const app: express.Application = express();
app.use(express.json())

app.use("/api/Category/", categoriesRoute);
app.use("/api/subCategory", subCategoryRoute)
app.use(globalErrorHandler);
// app.all("*", (req, res, next) => {
//   next({
//     statusCode: 404,
//     status: "fail",
//     message: `Can't find ${req.originalUrl} on this server!`
//   }as ErrorInterface);
// });
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});