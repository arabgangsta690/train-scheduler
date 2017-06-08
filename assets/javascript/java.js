
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAmc_JPUbzEBRpEZM3_mVuhib3ZOWiPBgw",
    authDomain: "train-e6610.firebaseapp.com",
    databaseURL: "https://train-e6610.firebaseio.com",
    projectId: "train-e6610",
    storageBucket: "train-e6610.appspot.com",
    messagingSenderId: "966560928405"
  };
  
  firebase.initializeApp(config);

  var database = firebase.database();

var Train name = "";
var Destination = "";
var Frequency = 0;
var FirstTrainTime = "";
var firstTimeConverted = "";
var currentTime = "";
var diffTime = "";
var tRemainder = "";
var tMinutesTillTrain = "";
var nextTrainTime = "";
var todoCount = 0;
var childKey = "";

var displayTime = function () {
    $('body').empty();
         database.ref().on("child_added", function (childSnapshot) {
       
        var firstTimeConverted = moment(childSnapshot.val().firstTrainTime, "hh:mm").subtract(1, "years");
        var currentTime = moment();
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        var tRemainder = diffTime % childSnapshot.val().frequency;
        var tMinutesTillTrain = childSnapshot.val().frequency - tRemainder;
        var nextTrainTime = moment().add(tMinutesTillTrain, "minutes").format("HH:mm");
        var tableRow = $('<tr>').attr('id', todoCount).attr('data-key', childKey);
        var nameCell = $('<td>').text(childSnapshot.val().name);
        var destinationCell = $('<td>').text(childSnapshot.val().destination);
        var frequencyCell = $('<td>').text(childSnapshot.val().frequency);
        var firstTrainTimeCell = $('<td>').text(childSnapshot.val().firstTrainTime);
        var nextTrainTimeCell = $('<td>').text(nextTrainTime);
        var tMinutesTillTrainCell = $('<td>').text(tMinutesTillTrain);
        var train = childSnapshot.val();
        train.id = childSnapshot.key;
       
        todoCount++;
      
        tableRow.append(nameCell).append(destinationCell).append(frequencyCell).append(firstTrainTimeCell).append(nextTrainTimeCell).append(tMinutesTillTrainCell).append(deleteButton);
        
        $('tbody').append(tableRow);
    });
};
 
$(document).on('ready', function () {
   displayTime();
 setInterval(displayTime, 60000);
   
   $('#submit').on('click', function () {

            name = $('#inputName').val().trim();
            destination = $('#inputDestination').val().trim();
            firstTrainHour = $('#inputHour').val();
            firstTrainMinute = $('#inputMinute').val();
            firstTrainTime = firstTrainHour + ":" + firstTrainMinute;
            frequency = $('#inputFrequency').val().trim();
              
              database.ref().push({
                name: name,
                destination: destination,
                firstTrainTime: firstTrainTime,
                frequency: frequency,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            });
            
            $('#inputName').val('');
            $('#inputDestination').val('');
            $('#inputHour').val('');
            $('#inputMinute').val('');
            $('#inputFrequency').val('');
            return false;
            
        }
    });
    
});
