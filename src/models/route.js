import mongoose from "mongoose";
import User from "../models/user.js";

const routeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  points: {
    type: Object,
    required: true,
  },
});

const Route = mongoose.model("Route", routeSchema);

export default Route;
