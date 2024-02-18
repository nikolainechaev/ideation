const express = require("express");
const router = express.Router();

// Getting all
router.get("/", (req, res) => {
  res.send("Hello World");
});
// Getting one
router.get("/:id", (req, res) => {});
// Create one
router.post("/", (req, res) => {});
// Update one
router.patch("/:id", (req, res) => {});
// Delete one
router.delete("/:id", (req, res) => {});

module.exports = router;
