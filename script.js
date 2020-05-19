var website = document.getElementById('website');
var username = document.getElementById('username');
var password = document.getElementById('password');
var generatePass = document.getElementById('generatePassword');
var reveal = document.getElementById('reveal');
var save = document.getElementById('save');

var data = [];
var newData = function(url,user,pass){
    return{
        website:url,
        username:user,
        password:pass
    }
}
//---------------------------------
generatePass.onclick = function(){    
    password.value = generatePassword(true,true,true);
}

reveal.onclick = function(){
    if(password.type === 'text'){
        password.setAttribute('type','password');
    } else {
        password.setAttribute('type','text');
    }   
}

save.onclick = function(){
    data.push(newData(website.value,username.value,password.value));
    console.log(data);    
    website.value = '';
    username.value = '';
    password.value  = '';
}
//----------------------


function arrayFromLowToHigh(low, high) {
    var array = []
    for (var i = low; i <= high; i++) {
      array.push(i)
    }
    return array
}

var UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90)
var LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122)
var NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57)
var SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47).concat(
  arrayFromLowToHigh(58, 64)
).concat(
  arrayFromLowToHigh(91, 96)
).concat(
  arrayFromLowToHigh(123, 126)
)

function generatePassword(includeUppercase, includeNumbers, includeSymbols) {
  var charCodes = LOWERCASE_CHAR_CODES;
  if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
  if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES);
  if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES);  
  var passwordCharacters = [];
  for (var i = 0; i < 32; i++) {
    var characterCode = charCodes[Math.floor(Math.random() * charCodes.length)]
    passwordCharacters.push(String.fromCharCode(characterCode));
  }
  return passwordCharacters.join('');
}