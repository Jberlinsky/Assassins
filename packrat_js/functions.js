//gotta include this
//<script src='https://cdn.firebase.com/js/client/1.0.11/firebase.js'></script>

//var fb = require('./firebase.js');
//var words = require('./words.js');

var myDataRef = new Firebase('https://vivid-fire-2947.firebaseio.com/');

function genUser(name, picture){
    var user = new Object();
    user.name = name;
    user.picture = picture;
    user.password = getWord();
    user.pw_chars_cracked = 0;
    user.key_cracked = false;
    myDataRef.push(user);
    document.write(user);
}
