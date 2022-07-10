// const { LOADIPHLPAPI } = require("dns");
import express from "express";
import dotenv from "dotenv";
import path from "path";
import morgan from "morgan";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import orderRoute from "./routes/orderRoute.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

dotenv.config();

connectDB();

app.get("/", (req, res) => {
  res.send("API is running...");
});

// access to body
app.use(express.json());

app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
app.use("/api/uploads", uploadRoutes);

// payment
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

// uploads folder static
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// error middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on ${PORT}`)
);
