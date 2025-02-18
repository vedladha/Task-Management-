import express from "express";
import pool from "../dbconnection";


const router = express.Router();

router.get("/", async (req: any, res) => {
    const { userId } = req.user;
  const tasks = await pool.query("SELECT * FROM tasks WHERE userId = $1", [userId]);
    res.json(tasks.rows);
});

router.post("/", async (req: any, res) => {
    const { title, description } = req.body;
    const { userId } = req.user;
    const result = await pool.query(
    "INSERT INTO tasks (title, description, userId) VALUES ($1, $2, $3) RETURNING *",
    [title, description, userId]
    );
    res.status(201).json(result.rows[0]);
});

router.put("/:id", async (req: any, res) => {
    const { id } = req.params;
    const { title, description, isComplete } = req.body;
    const { userId } = req.user;
    const result = await pool.query(
    "UPDATE tasks SET title=$1, description=$2, isComplete=$3 WHERE id=$4 AND userId=$5 RETURNING *",
    [title, description, isComplete, id, userId]
);
    res.json(result.rows[0]);
});

router.delete("/:id", async (req: any, res) => {
    const { id } = req.params;
    const { userId } = req.user;
    await pool.query("DELETE FROM tasks WHERE id = $1 AND userId=$2", [id, userId]);
    res.status(204).send();
});

export default router;
