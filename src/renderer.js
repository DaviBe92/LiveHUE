const electron = require('electron');
const { ipcRenderer } = electron;
const fs = require('fs');

// Global
let LHconfig;

// Tab switching
$('.tabAnchor').on('click', function () { // changes container bg to tab color stored in data attr
    var destBg = $(this).data('color');
    $('.tab-content').css('background', destBg);
});

// Shorthand for $( document ).ready()
$(function () {
    console.log("ready!");
});

// Config Handler_________________________________________________________

function loadConfig() {
    // read file first
    let rawdata = fs.readFileSync('./src/config.json');
    LHconfig = JSON.parse(rawdata);
}

function saveConfig() {
    // Save config
    let data = JSON.stringify(LHconfig, null, 2);
    fs.writeFileSync('./src/config.json', data);
    // Tell main, config has been updated
    ipcRenderer.send('Config:saved');
}


// LiveSplit Logic_________________________________________________________________________

// Input Handler______________________________________

// IP Field
$("#InputIPLivesplit").on("keypress", function (e) {
    if (e.key === "Enter") {
        // Cancel the default action, if needed
        e.preventDefault();
    }
});

$("#InputIPLivesplit").on("focusout", function (e) {
    // Load config
    loadConfig();
    // Change value
    LHconfig.LiveSplit_IP = $("#InputIPLivesplit").val();
    // Save config
    saveConfig();
});

// Autoconnect Field
$("#LiveSplit_autoconnect").on("click", function (e) {
    // Load config
    loadConfig();
    // Change value
    LHconfig.LiveSplit_autoconnect = $("#LiveSplit_autoconnect").prop('checked');
    // Save config
    saveConfig();
});


// Connection_________________________________________
function connectLiveSplit() {
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

// Web Request Handler__________________________________________________________________________________________

// Is enabled______________________________________________

$("#requestCheckmark").on("click", function (e) {
    // Load config
    loadConfig();
    // Change value
    LHconfig.WebRequest_Enabled = $("#requestCheckmark").prop('checked');
    // Save config
    saveConfig();
    // Handle Content
    if ($("#requestCheckmark").is(':checked'))
        $("#requestDiv").show();  // checked
    else
        $("#requestDiv").hide();  // unchecked
});
