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
$("#submit-btn").on("click", function () {
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var frequency = $("#frequency").val().trim();
    // using moment, this converts the value into hours and minutes and converts it to unix
    var firstTrain = moment($("#train-time").val().trim(), "HH:mm").format("X");

    // make a nextTrain variable that is an object to hold all of the values to make the code much shorter than storing them in four different variables.
    var nextTrain = {
        name: trainName,
        destination: destination,
        frequency: frequency,
        firstTrain: firstTrain
    };
    // pushes the nextTrain info into trainInfo on firebase (.ref to reference the root in firebase)
    trainInfo.ref().push(nextTrain);
});

// week 7, activity 19 really helpful for this part
trainInfo.ref().on("child_added", function (snapshot) {
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrain = snapshot.val().firstTrain;

    // need to convert the unix time back to minutes and calculate how many minutes away (AKA remainder)
    // used activity 20 as a reference for this
    var remainder = moment().diff(moment.unix(firstTrain), "minutes") % frequency;

    var minutes = frequency - remainder;
    var arrival = moment().add(minutes, "m").format("hh:mm A");

    // console log to make sure the conversions are working
    console.log(remainder);
    console.log(minutes);
    console.log(arrival);

    // jQuery to pull it all together and put the train info into the empty tbody     
    $("#train-schedule").append("<tbody> <tr> <td>" + name + "</td> <td>" + destination + "</td> <td>" + frequency + "</td> <td>" + arrival + "</td> <td>" + minutes + "</td> </tr> </tbody>");
});
