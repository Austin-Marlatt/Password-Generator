// Arrays to store password character types
const specialCharacters = ["!", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}", "~"]

const numericalCharacters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

const upperCaseCharacters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

const lowerCaseCharacters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

// function to receive password criteria from user
function getPassCriteria() {
  // variable to store length option from user, converts from string to number, returns NaN if no number was entered
  let length = parseInt(prompt("please enter a character value between 8 - 128."));

  // checks if length = integer
    if (Number.isNaN(length)) {
      alert("The value must be a number.");
      // cancels the function so the user can try again
      return null;
    }

  // checks if entered value is more than the set limit
    if (length > 128) {
      alert("The value must be less than 128");
      return null;
    }

    if (length < 8) {
      alert("The value must be more than 8");
      return null;
    }

  // confirm method used to check if user would like to include a certain character type, stores returned boolean in a variable
  let trueSpecial = confirm("would you like to include special characters?");
  let trueLower = confirm("would you like to include lower case characters?");
  let trueUpper = confirm("would you like to include upper case characters?");
  let trueNumeric = confirm("would you like to include numeric characters?");

  // checks if at least one character type was chosen
    if( trueSpecial === false &&
        trueLower === false &&
        trueUpper === false &&
        trueNumeric === false ) {
        alert("One character type must be chosen");
        return null
      }

  // object used to store the user's chosen password criteria
  let passCriteria = {
    length: length,
    trueSpecial: trueSpecial,
    trueLower: trueLower,
    trueUpper: trueUpper,
    trueNumeric: trueNumeric,
  }

  return passCriteria;
}

// function to build password using passCriteria
function generatePassword() {

  // assigned the output of getPassCriteria to a variable that I can reference
  let criteria = getPassCriteria();

  // array to store all selected characters
  let usedCharacters = [];

  //array to store one random character from each selected type
  let mustUseCharacters = [];

  // array to store completed password characters
  let password = [];

  // if statments to check boolean values of criteria, if true, concatinates the character array to the usedCharacters array,
  // insures that one of the selected types is used by storing it in a seperate array
  if (criteria.trueSpecial) {
    usedCharacters = usedCharacters.concat(specialCharacters);
    let mustUse = specialCharacters[(Math.floor(Math.random() * specialCharacters.length))];
    mustUseCharacters.push(mustUse);
  }

  if (criteria.trueLower) {
    usedCharacters = usedCharacters.concat(lowerCaseCharacters);
    let mustUse = lowerCaseCharacters[(Math.floor(Math.random() * lowerCaseCharacters.length))];
    mustUseCharacters.push(mustUse);
  }

  if (criteria.trueUpper) {
    usedCharacters = usedCharacters.concat(upperCaseCharacters);
    let mustUse = upperCaseCharacters[(Math.floor(Math.random() * upperCaseCharacters.length))];
    mustUseCharacters.push(mustUse);
  }

  if (criteria.trueNumeric) {
    usedCharacters = usedCharacters.concat(numericalCharacters);
    let mustUse = numericalCharacters[(Math.floor(Math.random() * numericalCharacters.length))];
    mustUseCharacters.push(mustUse);
  }

  // adds our must use characters to the password
  password = password.concat(mustUseCharacters);

  // function to add random characters to the password out of our usedCharacters array
    function randomGrab() {
      let randomCharacter = usedCharacters[(Math.floor(Math.random() * usedCharacters.length))];
      password.push(randomCharacter);
    }

  // for loop runs randomGrab() until the chosen length is met
    for (i = password.length; i < criteria.length; i++){
      randomGrab();
    }

  // returns the finished password as a string with no spaces
  return password.join("");
}

// Assignment Code
const generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  const password = generatePassword();
  const passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);