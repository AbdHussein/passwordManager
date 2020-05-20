var website = document.getElementById('website');
var username = document.getElementById('username');
var password = document.getElementById('password');
var generatePass = document.getElementById('generatePassword');
var reveal = document.getElementById('reveal');
var save = document.getElementById('save');
var snack = document.createElement('DIV');
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
reveal.onclick = function() {
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
      var website_Label = document.createElement('LABEL');
      var website_input = document.createElement('INPUT');
      var email_Label = document.createElement('LABEL');
      var email_input = document.createElement('INPUT');
      var pass_Label = document.createElement('LABEL');
      var pass= document.createElement('INPUT');
      var showPass = document.createElement('BUTTON');
      var deleteBtn = document.createElement('BUTTON');
      var EditBtn = document.createElement('BUTTON');
      pass.type = 'password';
      pass.readonly = true;     
      //---------
      EditBtn.classList.add('btn-edit');
      deleteBtn.classList.add('btn-delete');
      showPass.classList.add('btn-show');
      website_input.classList.add('pass');
      email_input.classList.add('pass');
      pass.classList.add('pass');
      showPass.onclick = function(){
        if(pass.type === 'text'){
          pass.setAttribute('type','password');
        } else {
          pass.setAttribute('type','text');
        }   
    }
      //---------
      EditBtn.innerHTML = 'Edit';
      deleteBtn.innerHTML = 'Delete';
      showPass.innerHTML = 'Reveal / Hide';
      website_Label.innerHTML = 'URL : ';
      email_Label.innerHTML = '<br>Email : ';
      pass_Label.innerHTML = '<br>Password : ';
      website_input.value = item.website; 
      email_input.value = item.username;
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

      EditBtn.onclick = function(){
        var index = data.indexOf(item);
        item.website = website_input.value;
        item.username = email_input.value;
        item.password = pass.value;
        console.log(item);  
        data.splice(index,1,item);
        console.log(data); 
        snack.setAttribute('id','snackbar');
        snack.innerHTML = 'Data Updated Successfully';        
        document.body.appendChild(snack); 
        snack.className = "show";     
        setTimeout(function(){ snack.className = snack.className.replace("show", ""); }, 3000);      
      }
      //--------
      div.appendChild(website_Label);
      div.appendChild(website_input);
      div.appendChild(email_Label);      
      div.appendChild(email_input);
      div.appendChild(pass_Label);
      div.appendChild(pass);
      div.appendChild(showPass);
      div.appendChild(deleteBtn);
      div.appendChild(EditBtn);
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