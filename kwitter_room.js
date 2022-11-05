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

function getData(){
    firebase.database().ref("/").on('value', function(snapshot){
        document.getElementById("outputIsAwesome").innerHTML = "";
        snapshot.forEach(function(childSnapshot){
            childKey  = childSnapshot.key;
        Room_names = childKey;
        });
    });
}

getData();
