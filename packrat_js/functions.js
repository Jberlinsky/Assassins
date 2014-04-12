//gotta include this
//<script src='https://cdn.firebase.com/js/client/1.0.11/firebase.js'></script>

//var fb = require('./firebase.js');
//var words = require('./words.js');

var myDataRef = new Firebase('https://vivid-fire-2947.firebaseio.com/');
var users = myDataRef.child('Users');

function genUser(fbid){
    var user = new Object();
    user.fbid = fbid;
    user.password = getWord();
    user.pw_remaining = user.password;
    user.pw_cracked = "";
    user.key_cracked = false;
    user.target = 'empty_target';
    users.push(user);
    console.log(user);
}

function getPwChar(id){
    var targetRef = users.child(id);
    targetRef.once('value', function(snapshot){
	var target = snapshot.val();
	if (target.pw_remaining.length > 0) {
	    var i = getRandomInt(0, target.pw_remaining.length);
	    target.pw_cracked = target.pw_cracked + target.pw_remaining.charAt(i);
	    target.pw_remaining = target.pw_remaining.substring(0, i) + target.pw_remaining.substring(i+1);
	    for(key in target){
		console.log(key + ": " + target[key] + "|");
		console.log("   ");
	    }
	    targetRef.set(target);
	}
    });
}

function getCrackedChars(id){
    var targetRef = users.child(id);
    targetRef.once('value', function(snapshot){
	var target = snapshot.val();
	return target.pw_cracked;
    });
}

function killUser(target_id, user_id) {
    var targetRef = users.child(target_id);
    targetRef.once('value', function(snapshot){
	var target = snapshot.val();
	target.key_cracked = true;
	var holder = target.target;
	target.target = "empty";
	targetRef.set(target);
	var userRef = users.child(user_id);
	userRef.once('value', function(snapshot){
	    var user = snapshot;
	    user.target =  holder;
	    userRef.set(user);
	});
    });
}

function setTargets(){
    users.once('value', function(snapshot){
	var userObj = snapshot.val();
	var holder = "";
	var first = "";
	for(key in userObj){
	    if(holder !== ""){
		userObj[key].target = holder
	    }else{
		first = key;
	    }
	    holder = key;
	}
	userObj[first].target = key;
	users.set(userObj);
    });
}
