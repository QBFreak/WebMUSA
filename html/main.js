window.onload = function(){
  var status = document.getElementById("status");
  var inputmarker = document.getElementById("inputmarker");
  var inputtextarea = document.getElementById("inputtextarea");
  var inputhistory = document.getElementById("inputhistory");
  var output = document.getElementById("output");

  var placeholder = "Type commands here";

  var marker_rect = inputmarker.getBoundingClientRect();
  var input_rect = inputtextarea.getBoundingClientRect();
  inputtextarea.style.float = "none";
  inputtextarea.style.position = "absolute";
  inputtextarea.style.left = marker_rect.right;

  inputtextarea.onfocus = function(){
    if (inputtextarea.value == placeholder) {
      inputtextarea.value = "";
    }
  }

  inputtextarea.onblur = function(){
    if (inputtextarea.value == "") {
      inputtextarea.value = placeholder;
    }
  }

  inputtextarea.addEventListener('keyup', function (e) {
      if (e.keyCode === 13) {
        command = inputtextarea.value;
        command = command.trimRight('\r\n ')
        // Is it a quit command?
        if (command == "/quit") {
          connection.close();
          status.innerHTML = "Disconnected";
          addOutputLine("Disconnecting.")
        // No? Send it to the game
        } else {
          connection.send(command)
        }
        // Add every attempted command to he input history
        addHistoryLine(command);
      }
  }, false);

  var connection = new WebSocket('ws://localhost:8080/');
  console.log("Connection created.");

  connection.onopen = function() {
    console.log("Connection Opened");
    status.innerHTML = "Connected";
    addOutputLine("You are now connected.");
    connection.send("Ping!");
  }

  connection.onerror = function (error) {
    addOutputLine('WebSocket Error ' + error)
    console.log('WebSocket Error ' + error);
  };

  connection.onmessage = function (e) {
    console.log("Connection recieved message: " + e.data);
    addOutputLine(e.data);
  };

  function addHistoryLine (line) {
    inputhistory.innerHTML += "<br />\n&#9657; " + line;
    inputtextarea.value = "";
    inputhistory.scrollTop = inputhistory.scrollHeight;
  }

  function addOutputLine (line) {
    console.log("OUTPUT: " + line);
    console.log(output.value);
    output.innerHTML += "<br />\n";
    output.innerHTML += line
  }

}
