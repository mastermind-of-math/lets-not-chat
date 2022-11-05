const firebaseConfig = {
    apiKey: "AIzaSyDfPUPYDbhY6Njm55sh5v3JwGJdbviA8Iw",
    authDomain: "letchats-5a53d.firebaseapp.com",
    databaseURL: "https://letchats-5a53d-default-rtdb.firebaseio.com",
    projectId: "letchats-5a53d",
    storageBucket: "letchats-5a53d.appspot.com",
    messagingSenderId: "605144574251",
    appId: "1:605144574251:web:1c613425de0bf5e93c7d6e"
};

const app = initializeApp(firebaseConfig);

var userName = localStorage.getItem("userId")
var roomName = localStorage.getItem("roomName")

function getData(){
    firebase.database().ref("/" + roomName).on('value', function(snapshot){
        document.getElementById("outputIsAwesome").innerHTML = "";
        snapshot.forEach(function(childSnapshot){
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if(childKey != "purpose"){
                var firebase_message_id = childKey;
                var message_data = childData;

                var name = message_data['msgname'];
                var message = message_data['message'];
                var like = message_data['like'];
                var nameTag = "<h4>" + name + "<img class='user_tick' src='tick.png'></h4>";
                var msgTag = "<h4 class='message_h4' style='color: black'>" + message + "</h4>"
                var likeButton = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLikes(this.id)'>";
                var spanTag = "<span class='glyphicon glyphicon-thumbs-up'>Likes: " + like + " </span></button>";
                var row = nameTag + msgTag + likeButton + spanTag;
                
                console.log(message_data);
                console.log(firebase_message_id);
                document.getElementById("outputIsAwesome").innerHTML += row
            }
        });
    });
}

getData();

function sendmsg(){
    var msg = document.getElementById("msgbox").value;
    firebase.database().ref(roomName).push({
        msgname:userName,
        message:msg,
        like:0
    });
    document.getElementById("msgbox").value = "";
}

function updateLikes(messageId){
    buttonId = messageId;
    likes = document.getElementById(buttonId).value;
    updatedLikes = Number(likes) + 1;
    firebase.database().ref(roomName).child(messageId).update({
        like:updatedLikes
    });
}

function logOut(){
    localStorage.removeItem("roomName");
    localStorage.removeItem("userId");
    window.location = "index.html";
}