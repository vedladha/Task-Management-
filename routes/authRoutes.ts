import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../dbconnection";

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const result = await pool.query(
            "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
            [username, hashedPassword]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(400).json({ error: "User already exists" });
    }
    });


    router.post("/login", async (req ,res): Promise<any> => {
        try {
        const { username, password } = req.body;
        const user = await pool.query<{ id: number; username: string; password: string }>(
            "SELECT * FROM users WHERE username = $1",
            [username]
        );
            if (user.rows.length === 0) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const valid = await bcrypt.compare(password, user.rows[0].password);
        if (!valid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user.rows[0].id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });

        return res.json({ token, userId: user.rows[0].id });
        } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ error: "Internal server error" });
        }
});

export default router;


