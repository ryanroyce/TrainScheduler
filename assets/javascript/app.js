  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDRd7b3c5fbwSsD9s46vx-Tpyzp-q-bF_Y",
    authDomain: "train-scheduler-e1fa5.firebaseapp.com",
    databaseURL: "https://train-scheduler-e1fa5.firebaseio.com",
    projectId: "train-scheduler-e1fa5",
    storageBucket: "train-scheduler-e1fa5.appspot.com",
    messagingSenderId: "908399834684"
  };

  firebase.initializeApp(config);

// need to store the information submitted in the form in a variable
var trainInfo = firebase.database();

// on click event for the submit button to store the values of the form
$("#submit-btn").on("click", function(){
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var frequency = $("#frequency").val().trim();
    // using moment, this converts the value into hours and minutes and converts it to unix
    var firstTrain = moment($("#train-time").val().trim(), "HH:mm").format("X");;

    // make a nextTrain variable that is an object to hold all of the values to make the code much shorter than storing them in four different variables.
    var nextTrain = {
        name: trainName,
        destination:destination,
        frequency: frequency,
        firstTrain: firstTrain
    };
    // pushes the nextTrain info into trainInfo on firebase (.ref to reference the root in firebase)
    trainInfo.ref().push(nextTrain);
});


