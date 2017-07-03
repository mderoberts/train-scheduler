var config = {
apiKey: "AIzaSyAiOMYWcRPSFFuVB5laBFdgdu3vIwDE-0A",
authDomain: "train-scheduler-b9579.firebaseapp.com",
databaseURL: "https://train-scheduler-b9579.firebaseio.com",
projectId: "train-scheduler-b9579",
storageBucket: "",
messagingSenderId: "717031140671"
};

firebase.initializeApp(config);

var database = firebase.database();

// Initial variables
var name = "";
var destination = "";
var time = "";
var frequency = "";

$("#submit").on("click", function(){
    event.preventDefault();
    // Get inputs
    name = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    time = $("#time-input").val().trim();
    frequency = $("#frequency-input").val().trim();
    // Object for new data
    var newTrain = {
        name: name,
        destination: destination,
        time: time,
        frequency: frequency
    };
    // Add info to database
    database.ref().push(newTrain);
    // Empty inputs
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
});