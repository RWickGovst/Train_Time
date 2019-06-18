// on submit add a train to the schedule above
// display schedule
// connect to the database
// add the train to the database
// show schedule elements in real time
$(document).ready(function () {
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
    var nextTrain = "";
    var timeUntil = "";
    var timeUntilNext;
    var nextTrainArrival;

    $("#add-train").on("click", function (event) {
        event.preventDefault();
        // console.log("on click event");

        // Grabbed values from text boxes
        name = $("#train-name").val().trim();
        destination = $("#final-destination").val().trim();
        firstTrain = moment($("#first-time").val().trim(), "HH:mm").format("LT");
        howOften = $("#howOften").val();
        
        // console.log(name);
        // console.log(destination);
        // console.log(firstTrain);
        // console.log(howOften);
        var newTrain = {
            name: name,
            destination: destination,
            firstTrain: firstTrain,
            howOften: howOften,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        };

        database.ref().push(newTrain);
            
            formClear();
        });

    database.ref().on("child_added", function (snapshot) {
            
        // storing the snapshot.val() in a variable for convenience
        var sv = snapshot.val();
        
        // Change the HTML to reflect
        var trainName = snapshot.val().name;
        var newDestination = snapshot.val().destination;
        var startTrain = snapshot.val().firstTrain;
        var timeBetween = snapshot.val().howOften;

        calculations();
        
        var newRow = $("<tr>").prepend(
            $("<td>").text(trainName),
            $("<td>").text(newDestination),
            $("<td>").text(startTrain),
            $("<td>").text(timeBetween),
            $("<td>").text(nextTrainArrival),
            $("<td>").text(timeUntilNext)
        );

        $("#trainSchedule > tbody").prepend(newRow);

        // Handle the errors
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
    
    function formClear() {
        $("#train-name").val("");
        $("#final-destination").val("");
        $("#first-time").val("");
        $("#howOften").val("");
    }
    
    function calculations(){
        var tFrequency = howOften;
        var firstTime = firstTrain;

        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        // console.log(firstTimeConverted);

        // Current Time
        var currentTime = moment().format('HH:mm');
        // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        // console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % tFrequency;
        // console.log(tRemainder);

        // Minute Until Train
        timeUntilNext = tFrequency - tRemainder;
        // console.log("MINUTES TILL TRAIN: " + timeUntilNext);

        // Next Train
        nextTrainArrival = moment().add(timeUntilNext, "minutes");
        // console.log("ARRIVAL TIME: " + moment(nextTrainArrival).format("HH:mm"));
        // var timeToNext = parseInt(timeUntilNext);
        
        // console.log(timeUntilNext);
        // console.log(nextTrainArrival);

        return timeUntilNext, nextTrainArrival;
    }

});
