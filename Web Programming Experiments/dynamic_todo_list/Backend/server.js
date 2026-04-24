const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("db.sqlite");

// Created table matching your frontend (removed 'priority')
db.run(`CREATE TABLE IF NOT EXISTS tasks(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    isDone INTEGER DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

// Fetch all tasks
app.get("/tasks", (req, res) => {
    db.all("SELECT * FROM tasks ORDER BY id ASC", [], (e, r) => res.json(r));
});

// Add a new task
app.post("/tasks", (req, res) => {
    let { title } = req.body;
    db.run("INSERT INTO tasks(title) VALUES(?)", [title], function() {
        res.json({ id: this.lastID, title: title, isDone: 0 });
    });
});

// Edit a task's text
app.put("/tasks/:id", (req, res) => {
    let { title } = req.body;
    db.run("UPDATE tasks SET title=? WHERE id=?", [title, req.params.id], () => res.json({}));
});

// Toggle task completion status
app.patch("/tasks/:id/status", (req, res) => {
    db.run("UPDATE tasks SET isDone = CASE WHEN isDone=0 THEN 1 ELSE 0 END WHERE id=?", [req.params.id], () => res.json({}));
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
    db.run("DELETE FROM tasks WHERE id=?", [req.params.id], () => res.json({}));
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});