const electron = require('electron');
const { ipcRenderer } = electron;

// Tab switching
$('.tabAnchor').on('click', function () { // changes container bg to tab color stored in data attr
    var destBg = $(this).data('color');
    $('.tab-content').css('background', destBg);
});

// Shorthand for $( document ).ready()
$(function() {
    console.log( "ready!" );
});


// LiveSplit Logic_________________________________________________________________________

// Connection_________________________________________
function connectLiveSplit() {
    console.log("pressed")
    ipcRenderer.send('LiveSplit:connectBtn');
}
// Connect Handler
ipcRenderer.on('LiveSplit:connected', function () {
    $("#btn_livesplit_connect").text("Disconnect").addClass("btn-danger").removeClass("btn-primary")
});
// Disconnect Handler
ipcRenderer.on('LiveSplit:disconnected', function () {
    $("#btn_livesplit_connect").text("Connect").addClass("btn-primary").removeClass("btn-danger")
});

// State Display________________________________________

ipcRenderer.on('LiveSplit:notRunning', function () {
    $("#LSstate").text("Not Running").addClass("badge-primary").removeClass("badge-success").removeClass("badge-danger").removeClass("badge-warning");
});

ipcRenderer.on('LiveSplit:green', function () {
    console.log("green received");
    $("#LSstate").text("Green").addClass("badge-success").removeClass("badge-primary-success").removeClass("badge-danger").removeClass("badge-warning");
});

ipcRenderer.on('LiveSplit:red', function () {
    $("#LSstate").text("Red").addClass("badge-danger").removeClass("badge-success").removeClass("badge-primary").removeClass("badge-warning");
});

ipcRenderer.on('LiveSplit:ended', function () {
    $("#LSstate").text("Ended").addClass("badge-primary").removeClass("badge-success").removeClass("badge-danger").removeClass("badge-warning");
});

ipcRenderer.on('LiveSplit:personalBest', function () {
    $("#LSstate").text("Personal Best").addClass("badge-warning").removeClass("badge-success").removeClass("badge-danger").removeClass("badge-primary");
});