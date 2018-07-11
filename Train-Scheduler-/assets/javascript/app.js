var firstTimeConverted = 0;
var trainName;
var destination;
var firstTrain = 0;
var frequency = 0;
var diffTime = 0;
var remainder = "";
var minutesTillTrain = "";
var nextTrain = "";

$(document).ready(function(){
  
    var config = {
      apiKey: "AIzaSyDfnKzVK4m05VGgrRnb8m_zSKy9icn-UYk",
      authDomain: "train-scheduler-bd6d8.firebaseapp.com",
      databaseURL: "https://train-scheduler-bd6d8.firebaseio.com",
      projectId: "train-scheduler-bd6d8",
      storageBucket: "train-scheduler-bd6d8.appspot.com",
      messagingSenderId: "640158157005"
    };

    firebase.initializeApp(config);

    var database = firebase.database()

    $("#subBtn").click(function(event){
      
      event.preventDefault()

      //is capturing the values
      trainName = $("#trainNameInput").val().trim();
      destination = $("#destinationInput").val().trim();
      firstTrain = $("#firstTrainInput").val().trim();
      frequency = $("#frequencyInput").val().trim();

      //and pushing them to the firebase database
          database.ref().push({    
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP // takes timseamp of when the data goes into the database
          });

      // clears the text
      $("#trainNameInput").val("");
      $("#destinationInput").val("");
      $("#log-date-input").val("");
      $("#frequencyInput").val("");

      return false;
    });

    database.ref().on("child_added", function(snapshot){

      var sv = snapshot.val();

      //Time calculations
      firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
      diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      remainder = diffTime % sv.frequency;
      minutesTillTrain = sv.frequency - remainder;
      nextTrain = moment().add(minutesTillTrain, "minutes").format("hh:mm A");

      //Adding rows and columns
      var newRow = $("<tr>");

      var trainNameTd = $("<td>");
      var destinationTd = $("<td>");
      var frequencyTd = $("<td>");
      var nextArrivalTd = $("<td>");
      var minutesAwayTd = $("<td>");

      //Adding the values as text
      trainNameTd.text(sv.trainName);
      destinationTd.text(sv.destination);
      frequencyTd.text(sv.frequency);
      nextArrivalTd.text(nextTrain);
      minutesAwayTd.text(minutesTillTrain);
  
      //Adding the contents to the row
      newRow.append(trainNameTd);
      newRow.append(destinationTd);
      newRow.append(frequencyTd);
      newRow.append(nextArrivalTd);
      newRow.append(minutesAwayTd);

      $("#tBody").append(newRow);

    })
});
