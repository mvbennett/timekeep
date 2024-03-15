const fs = require('fs');
const readline = require('readline');

function parseDate(dateObj) {
  const year = dateObj.getFullYear()
  const monthNum = dateObj.getMonth() + 1;
  const month = monthNum < 10 ? `0${monthNum}`: `${monthNum}`;
  const date = dateObj.getDate();
  return `${year}-${month}-${date}` || ''; // not sure if this fallback is necessary
}

function saveNote(note, date = new Date()) {
  const noteObject = parseJsonFile();
  const parsedDate = parseDate(date);
  
  // Create a new JSON array in the JSON object to hold the note
  if(!noteObject[parsedDate]) noteObject[parsedDate] = [];
  
  // Add the note to the JSON object
  noteObject[parsedDate].push(note);
  
  // Write the JSON object to a file
  fs.writeFileSync('notes.json', JSON.stringify(noteObject));
}

function parseJsonFile() {
  const noteFile = 'notes.json';

  const fileContents = fs.readFileSync(noteFile);

  return JSON.parse(fileContents);
}

function readNotes() {
  const noteFile = 'notes.json';
  
  const fileContents = fs.readFileSync(noteFile, 'utf8');
  
  const notes = JSON.parse(fileContents);

  return notes;
}


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Prompt user for input
rl.question('Enter a note: ', (input) => {
  // Implement later: (might want to use a flag instead for different dates)
  // /\d+\/\d+/i.test(input);
  // const easyDate = input.match(/\d+\/\d+/i)?.[0] || null;
  // const note = input.match(/(?!\d+\/\d+)/i)?.[0];
  const note = input;

  let date;
  // Implement later:
  // if(easyDate) {
  //   const month = easyDate.match(/^\d+/i)?.[0];
  //   const date = easyDate.match(/\d+$/i)?.[0];
  //   const fixedMonth = month.length > 1 ? month : `0${month}`;
  //   const fixedDate = date.length > 1 ? date : `${date}`;
  //   const year = new Date().getFullYear();
  //   date = `${year}-${fixedMonth}-${fixedDate}`;
  // }

  // Save the note to the JSON file
  saveNote(note, date);
  console.log(`Note saved successfully!!!`);
  
  // Read the notes from the JSON file and display them
  const notes = readNotes();
  console.log('Current log:', notes);
  
  rl.close();
});

