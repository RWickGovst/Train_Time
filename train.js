// on submit add a train to the schedule above
// display schedule
// connect to the database
// add the train to the database
// show schedule elements in real time
$(document).ready(function(){
    $('select').formSelect();
  

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
    // record timestamp
    // Grabbed values from text boxes
    name = $("#train-name").val();
    destination = $("#final-destination").val();
    firstTrain = $("#first-time").val();
    howOften = $("#howOften").val();
    // nextTrain = $("#nextTrain").val();
    // timeUntil = $("#timeUntil").val();

    console.log(name);
    console.log(destination);
    console.log(firstTrain);
    console.log(howOften);

    // Code for handling the push
    database.ref().push({
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        howOften: howOften,
        // nextTrain: nextTrain,
        // timeUntil: timeUntil
    });

});

// Firebase watcher .on("child_added"
database.ref().on("child_added", function (snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // Change the HTML to reflect
    $("#train-name").text(sv.name);
    $("#final-destination").text(sv.destination);
    $("#first-time").text(sv.firstTrain);
    $("#howOften").text(sv.howOften);
    // $("#nextTrain").text(sv.nextTrain);
    // $("timeUntil").text(sv.timeUntil);

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
});