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

// Submit button to log info in firebase
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

// Firebase event to add new trains in database and HTML
database.ref().on("child_added", function(snapshot){
    console.log(snapshot.val());
    // Store data
    name = snapshot.val().name;
    destination = snapshot.val().destination;
    time = snapshot.val().time;
    frequency = snapshot.val().frequency; 
    // Console log data
    console.log(name);
    console.log(destination);
    console.log(time);
    console.log(frequency);
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(time, "hh:mm").subtract(1, "years");
    // Current Time
    var currentTime = moment();
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm A");
    // Add data to table
    $("#schedule-table > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});