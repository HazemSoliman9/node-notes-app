const notes = require("./notes.js");
const chalk = require("chalk");
const yargs = require("yargs");

yargs.command({
  command: "add",
  describe: "Adding a note",
  builder: {
    title: {
      describe: "Title for your note",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "The body of your note",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  },
});

yargs.command({
  command: "remove",
  describe: "Removing a note",
  builder: {
    title: {
      describe: "Title of the note you want to remove",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.removeNote(argv.title);
  },
});

yargs.command({
  command: "list",
  describe: "Lists your notes",
  handler() {
    notes.listNotes();
  },
});
yargs.command({
  command: "read",
  describe: "Reading a note",
  builder: {
    title: {
      demandOption: true,
      describe: "Title of note you want to read",
      type: "string",
    },
  },
  handler(argv) {
    notes.readNote(argv.title);
  },
});

yargs.argv;
