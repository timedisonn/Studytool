var timeLeft = document.getElementById('sessionTime').value * 60;
var breakTime = document.getElementById('breakTime').value * 60;
var timerId;
var isBreak = false;
var sessionCount = 0;

function startTimer() {
  stopTimer(); // Stop any running timer
  timerId = setInterval(function() {
    timeLeft--;
    var minutes = Math.floor(timeLeft / 60);
    var seconds = timeLeft % 60;
    document.getElementById('timer').textContent = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    if (timeLeft <= 0) {
      isBreak = !isBreak;
      if (isBreak) {
        timeLeft = breakTime;
        if (++sessionCount >= 4) {
          timeLeft = 30 * 60; // Long break
          showAlert('Time for your long break');
        } else {
          showAlert('Time for your break');
        }
      } else {
        timeLeft = document.getElementById('sessionTime').value * 60;
      }
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerId);
}

function resetTimer() {
  location.reload(); // Reload the page
}

function applyChanges() {
  stopTimer();
  timeLeft = document.getElementById('sessionTime').value * 60;
  breakTime = document.getElementById('breakTime').value * 60;
  document.getElementById('timer').textContent = timeLeft / 60 + ':00';
}

function showAlert(message) {
  var alertElement = document.getElementById('alert');
  alertElement.textContent = message;
  alertElement.style.display = 'block';
  setTimeout(function() {
    alertElement.style.display = 'none';
  }, 5000); // Hide after 5 seconds
}

// Then, in your startTimer function:
if (timeLeft <= 0) {
  isBreak = !isBreak;
  if (isBreak) {
    timeLeft = breakTime;
    if (++sessionCount >= 4) {
      timeLeft = 30 * 60; // Long break
      showAlert('Time for your long break');
    } else {
      showAlert('Time for your break');
    }
  } else {
    timeLeft = document.getElementById('sessionTime').value * 60;
  }
}

var helpButton = document.getElementById('helpButton');
var popup = document.getElementById('helpPopup');
var closeButton = document.getElementById('closeButton');

helpButton.onclick = function() {
  popup.style.display = 'block';
}

closeButton.onclick = function() {
  popup.style.display = 'none';
}

window.onclick = function(event) {
  if (event.target == popup) {
    popup.style.display = 'none';
  }
}
