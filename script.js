var website = document.getElementById('website');
var username = document.getElementById('username');
var password = document.getElementById('password');
var generatePass = document.getElementById('generatePassword');
var reveal = document.getElementById('reveal');
var save = document.getElementById('save');
//--------------------
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

function append(item){
    if(!document.getElementById('noPasswords').hasAttribute('hidden')){
        document.getElementById('noPasswords').hidden = true;
    }
    var div = document.createElement('DIV');
    div.classList.add('div');
      //---------
      var h5_website = document.createElement('H5');
      var h5_email = document.createElement('H5');
      var pass= document.createElement('INPUT');
      var showPass = document.createElement('BUTTON');
      var deleteBtn = document.createElement('BUTTON');
      pass.type = 'password';
      pass.readonly = true;     
      //---------
      deleteBtn.classList.add('btn');
      showPass.classList.add('btn');
      h5_website.classList.add('h5');
      h5_email.classList.add('h5');
      pass.classList.add('pass');
      showPass.onclick = function(){
        if(pass.type === 'text'){
          pass.setAttribute('type','password');
        } else {
          pass.setAttribute('type','text');
        }   
    }
      //---------
      deleteBtn.innerHTML = 'Delete';
      showPass.innerHTML = 'Reveal / Hide';
      h5_website.innerHTML = 'URL: <br>'+ item.website; 
      h5_email.innerHTML = 'USERNAME: <br>'+ item.username;
      pass.value = item.password;      
      //--------
      deleteBtn.onclick = function(){
        div.remove();
        var index = data.indexOf(item);
        data.splice(index,1);
        console.log(data.length);        
        if(data.length === 0){
          document.getElementById('noPasswords').hidden = false;
        }
      }
      //--------
      div.appendChild(h5_website);
      div.appendChild(h5_email);
      div.appendChild(pass);
      div.appendChild(showPass);
      div.appendChild(deleteBtn);
      //---------
      document.getElementById('display').appendChild(div);
}
//--------------
save.onclick = function(){    
    data.push(newData(website.value,username.value,password.value));
    console.log(data);    
    website.value = '';
    username.value = '';
    password.value  = '';
    append(data[data.length-1]);
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