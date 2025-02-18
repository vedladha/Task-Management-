import express from "express";
import dotenv from "dotenv";
import helmet from "helmet"; 
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";
import cors from "cors";
import authentication from "./middleware/authMiddleware"

dotenv.config();
const app = express();

app.use(express.json()); 
app.use(cors()); 
app.use(helmet()); 

app.use("/ping", (req, res) => {
    res.send({ status: 200, statusText: "success" });
});

app.use("/auth", authRoutes); 
app.use("/tasks", authentication, taskRoutes); 


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


