(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var stompClient = null;

//function setConnected(connected) {
//    $("#connect").prop("disabled", connected);
//    $("#disconnect").prop("disabled", !connected);
//    if (connected) {
//        $("#conversation").show();
//    }
//    else {
//        $("#conversation").hide();
//    }
//    $("#greetings").html("");
//}

// function connect() {
//     var socket = new SockJS('/ws');
//     stompClient = Stomp.over(socket);
//     stompClient.connect({}, function (frame) {
//         setConnected(true);
//         console.log('Connected: ' + frame);
//         stompClient.subscribe('/topic/teamId1', function (message) {
//             showGreeting(JSON.parse(message.body).text);
//         });
//     });
// }

function disconnect() {
    if (stompClient != null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function dropFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

//window.addEventListener('click', function () {
//  if (!event.target.matches('.dropbtn')) {
//
//    let dropdowns = document.getElementsByClassName("dropdown-content");
//    let i;
//    for (i = 0; i < dropdowns.length; i++) {
//      let openDropdown = dropdowns[i];
//      if (openDropdown.classList.contains('show')) {
//        openDropdown.classList.remove('show');
//      }
//    }
//  }
//});

function sendMessage() {
    stompClient.send("/app/teamId1", {}, JSON.stringify({'text': $("#message").val()}));
}

function showGreeting(message) {
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendMessage(); });
});

window.addEventListener('load', function () {
    function setConnected(connected) {
        $("#connect").prop("disabled", connected);
        $("#disconnect").prop("disabled", !connected);
        if (connected) {
            $("#conversation").show();
        }
        else {
            $("#conversation").hide();
        }
        $("#greetings").html("");
    }

    function connect() {
    let socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);

        stompClient.subscribe('/topic/teamId1', function (message) {
            showGreeting(JSON.parse(message.body).text);
        });

        stompClient.subscribe('/topic/matchupId1', function (message) {
            showGreeting(JSON.parse(message.body).text);
        });
    });
//    stompClient2 = Stomp.over(socket);
//        stompClient2.connect({}, function (frame) {
//            setConnected(true);
//            console.log('Connected: ' + frame);
    }

    connect();
});
//console.log(connect());

},{}]},{},[1])