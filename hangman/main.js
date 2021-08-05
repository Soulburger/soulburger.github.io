var words = [
	"python",
	"sharp",
	"ruby",
    "accolade",
    "acrimony",
    "angst",
    "anomaly",
    "antidote",
    "baroque",
    "boondoggle",
    "bourgeois",
    "bravado",
    "brogue",
    "brusque",
    "byzantine",
    "cacophony",
    "camaraderie",
    "capricious",
    "caustic",
    "charisma",
    "cloying",
    "dichotomy",
    "dilettante",
    "disheveled",
    "elan",
    "ennui",
    "epitome",
    "equanimity",
    "equivocate",
    "esoteric",
    "euphemism",
    "fastidious",
    "fiasco",
    "finagle",
    "glib",
    "gregarious",
    "haram",
    "harbinger",
    "hedonist",
    "heresy",
    "idiosyncratic",
    "idyllic",
    "indelicate",
    "infinitesimal",
    "insidious",
    "junket",
    "kitsch",
    "litany",
    "lurid",
    "machiavellian",
    "malaise",
    "malinger",
    "mantra",
    "maudlin",
    "mercenary",
    "minimalist",
    "misnomer",
    "narcissist",
    "nirvana",
    "oblivion",
    "ogle",
    "ostentatious",
    "ostracize",
    "panacea",
    "paradox",
    "peevish",
    "perfunctory",
    "philistine",
    "precocious",
    "propriety",
    "quintessential",
    "revel",
    "rhetoric",
    "scintillating",
    "spartan",
    "stigma",
    "stoic",
    "suave",
    "svengali",
    "sycophant",
    "teetotaler",
    "tirade",
    "tryst",
    "ubiquitous",
    "unrequited",
    "untenable",
    "vicarious",
    "vile",
    "waft",
    "zealous",
    "uncopyrightable",
    "bruh"

]

let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function randomWord() {
  answer = words[Math.floor(Math.random() * words.length)];
}

function generateButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
      <button id='` + letter + `' onClick="handleGuess('` + letter + `')"> ` + letter + ` </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}

function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = './images/' + mistakes + '.gif';
}

function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById('keyboard').innerHTML = 'You Won!';
  }
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
    document.getElementById('keyboard').innerHTML = 'You Lost';
  }
}

function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = './images/0.gif';

  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();