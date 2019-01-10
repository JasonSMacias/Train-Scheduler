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
  console.log(newTrain);


});