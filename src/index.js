const express = require("express");
const fs = require("fs");
require("./db/mongoose");
const app = express();
const Note = require("./models/note");
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get("/notes-hard", (req, res) => {
  fs.readFile(`${__dirname}/notes.json`, "utf-8", (err, data) => {
    if (err) {
      return console.log(err);
    }
    res.status(200).send(data);
  });
});

app.get("/notes", async (req, res) => {
  try {
    const notes = await Note.find({});
    res.status(200).send(notes);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post("/notes", async (req, res) => {
  const note = new Note(req.body);
  try {
    await note.save();
    res.status(200).send(note);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.patch("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { note } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { note },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).send({ error: "Note not found" });
    }
    res.status(200).send(updatedNote);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.delete("/notes/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).send({ error: "Note not found" });
    }
    res.status(200).send({ message: "Note deleted" });
  } catch (err) {
    res.status(400).send(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
