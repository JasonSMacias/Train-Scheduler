// Initialize Firebase
var config = {
  apiKey: "AIzaSyAd5IL94KHV0qC9BuiDN23_l5TNuPg3d2w",
  authDomain: "classprojects-d8b8c.firebaseapp.com",
  databaseURL: "https://classprojects-d8b8c.firebaseio.com",
  projectId: "classprojects-d8b8c",
  storageBucket: "classprojects-d8b8c.appspot.com",
  messagingSenderId: "349136664077"
};
firebase.initializeApp(config);

// variable to hold firebase db
var database = firebase.database();

// Submit button on click to add train object
$("#submit-button").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainStart = $("#first-train-time-input").val().trim();
  var trainFrequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    startTime: trainStart,
    frequency: trainFrequency
  };

  // pushes new train object to firebase & console logs
  database.ref().push(newTrain);
  console.log(newTrain.destination);

  // Toggle modal
  $('#myModal').modal('toggle');

  // Clear html inputs
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-time-input").val("");
  $("#frequency-input").val("");
});

// Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainStart = childSnapshot.val().startTime;
  var trainFrequency = childSnapshot.val().frequency;

  // Logging train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainStart);
  console.log(trainFrequency);
  // setting up a variable that contains the current time

  var currentTime = /* pull current military time */;

  // Calculate next arrival ********
    var trainNext =  currentTime - ((currentTime - trainStart) % trainFrequency) + trainFrequency;

  // Calculate minutes away ********
    var trainAway = trainNext - currentTime;

  // Create the new row 
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(trainNext),
    $("<td>").text(trainAway),
  );

  // Append the new row to the table
  $("#train-table-body").append(newRow);

});