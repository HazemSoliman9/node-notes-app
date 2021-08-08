const chalk = require("chalk");
const fs = require("fs");

const addNote = (title, body) => {
  const notes = loadNotes();
  if (containsDuplicates(notes, title)) {
    console.log(chalk.red("Note title already taken!!"));
  } else {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green("Note added"));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const newNotes = notes.filter((note) => note.title !== title);
  if (notes.length === newNotes.length) {
    console.log(chalk.red("Note not found"));
  } else {
    console.log(chalk.green("Note removed"));
  }
  saveNotes(newNotes);
};

const containsDuplicates = (myNotes, noteTitle) => {
  const duplicate = myNotes.find((myElement) => myElement.title === noteTitle);
  return !(duplicate === undefined);
};
const saveNotes = (newNotes) => {
  const dataJSON = JSON.stringify(newNotes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const listNotes = () => {
  const notes = loadNotes();
  var titles = "Your Notes: ";
  notes.forEach((note) => {
    titles += note.title + ", ";
  });
  console.log(chalk.green(titles));
};

const readNote = (noteTitle) => {
  const notes = loadNotes();
  const target = notes.find((note) => note.title === noteTitle);
  if (target === undefined) {
    console.log(chalk.red("Note not found"));
  } else {
    console.log(
      chalk.green("Title: " + target.title + " Body: " + target.body)
    );
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
