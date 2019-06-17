// on submit add a train to the schedule above
// display schedule
// connect to the database
// add the train to the database
// show schedule elements in real time
$(document).ready(function(){
    // $('select').formSelect();
  

var firebaseConfig = {
    apiKey: "AIzaSyBiO2YIkbQgYoxbete2xPRt2aa4BmhjVxM",
    authDomain: "first-firebase-project-7ad10.firebaseapp.com",
    databaseURL: "https://first-firebase-project-7ad10.firebaseio.com",
    projectId: "first-firebase-project-7ad10",
    storageBucket: "first-firebase-project-7ad10.appspot.com",
    messagingSenderId: "941027991657",
    appId: "1:941027991657:web:506e641516e5d6c5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

//   variables here
// Initial Values
var name = "";
var destination = "";
var firstTrain = "";
var howOften = "";
// var nextTrain = "";
// var timeUntil = "";


$("#add-train").on("click", function (event) {
    event.preventDefault();
    // console.log("on click event");
    
    // Grabbed values from text boxes
     name = $("#train-name").val();
     destination = $("#final-destination").val();
     firstTrain = $("#first-time").val();
     howOften = $("#howOften").val();
    // nextTrain = $("#nextTrain").val();
    // timeUntil = $("#timeUntil").val();

    // console.log(name);
    // console.log(destination);
    // console.log(firstTrain);
    // console.log(howOften);

    // Code for handling the push
    
    database.ref().push({
        // trainInfo,
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        howOften: howOften,
        // nextTrain: nextTrain,
        // timeUntil: timeUntil,
        // record timestamp
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    
    });
formClear();
});
// function scheduleUpdate() {
//     if ($("#train-name").val() != null &&
//         $("#train-name").val() != '') {
//       // Add product to Table
//       addToSchedule();
//       // Clear form fields
//       formClear();
//       // Focus to product name field
//     //   $("#train").focus();
    
//   }
function formClear() {
    $("#train-name").val("");
    $("#final-destination").val("");
    $("#first-time").val("");
    $("#howOften").val("");
  }
  database.ref().on("child_added", function (snapshot) {

    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // Change the HTML to reflect
    $("#train").text(sv.name);
    $("#destination").text(sv.destination);
    $("#time").text(sv.firstTrain);
    $("#frequency").text(sv.howOften);

    var tFrequency = howOften;

    // Time is 3:30 AM
    var firstTime = firstTrain;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    // console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    // console.log(tRemainder);

    // Minute Until Train
    var timeUntilNext = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + timeUntilNext);

    // Next Train
    var nextTrainArrival = moment().add(timeUntilNext, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrainArrival).format("hh:mm"));

    $("#nextTrain").text(sv.nextTrainArrival);
    $("timeUntil").text(sv.timeUntilNext);


    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
});

