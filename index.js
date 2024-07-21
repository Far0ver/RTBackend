import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import registerRoutes from "./src/routes/auth.js";
import page from "./src/routes/page.js";
import key from "./src/config/key.js";
import profile from "./src/routes/profile.js";
import cookieParser from "cookie-parser";
import helpers from './src/routes/helpers.js'
import authMiddleware from "./src/middleware/authMiddleware.js";
import updateTokenMiddleware from "./src/middleware/updateTokenMiddleware.js";
import route from './src/routes/route.js'


// import key from './src/config/key.js'
// import bodyParser from "body-parser";
const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "PUT", "POST"],
};
app.use(cors(corsOptions));
const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(key.mongoURL)
  .then(() => console.log("успешно бд"))
  .catch((error) => console.log(`у тебя : ${error}`));



app.use("/auth", registerRoutes)
app.use("/", page); 
app.use('/profile', authMiddleware, updateTokenMiddleware, profile)
app.use('/profile/routes', route);
app.use('/helpers', helpers)

app.listen(+PORT, () => {});
