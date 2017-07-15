var config = {
    apiKey: "AIzaSyCyf4XPX4mTMO7SwNhdaunVfqy0sXhLpBI",
    authDomain: "briangetbased.firebaseapp.com",
    databaseURL: "https://briangetbased.firebaseio.com",
    projectId: "briangetbased",
    storageBucket: "briangetbased.appspot.com",
    messagingSenderId: "82537920147"
    };

    firebase.initializeApp(config);
    var dataRef = firebase.database();

    $("#submit-button").on("click", function() {
    event.preventDefault();   
    var trainInput = $("#trainInput").val().trim();
    var timeInput = $("#timeInput").val().trim();
    var frequencyInput = $("#frequencyInput").val().trim();
    var destinationInput = $("#destinationInput").val().trim();
     
    dataRef.ref().push({

            trainInput: trainInput,
            destinationInput: destinationInput,
            frequencyInput: frequencyInput,
            timeInput: timeInput,
          //  arrival: nextTrain,
          //  minutesnext: tMinutesTillTrain,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
             });    
     });  
 
  
     dataRef.ref().orderByChild("dateAdded").limitToLast(100).on("child_added", function(snapshot) {
        // storing the snapshot.val() in a variable for convenience
        var sv = snapshot.val();

        var firstTimeConverted = moment(sv.timeInput, "hh:mm").subtract(1, "years");
        console.log(firstTimeConverted);

    // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % sv.frequencyInput;
        console.log("Brian" + tRemainder);

        // Minute Until Train
        var tMinutesTillTrain = sv.frequencyInput - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

        $("#trainName").append("<br>" + sv.trainInput);
        $("#destination").append("<br>" + sv.destinationInput);
        $("#trainTime").append("<br>" + sv.timeInput);
        $("#frequency").append("<br>" + sv.frequencyInput + ' mins');
        $("#arrival").append("<br>" + nextTrain);
        $("#minutesNext").append("<br>" + tMinutesTillTrain);
        
       
          // Handle the errors
        }, function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });