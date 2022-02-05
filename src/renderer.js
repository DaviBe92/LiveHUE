// Imports
const electron = require('electron');
const path = require('path')
const { ipcRenderer } = electron;
const fs = require('fs');

// Global
let LHconfig;

// GUI Handler______________________________________________________________________________________________________________________

// Tab switching_____________________________

$('.tabAnchor').on('click', function () { // changes container bg to tab color stored in data attr
    var destBg = $(this).data('color');
    $('.tab-content').css('background', destBg);
});

// Config Handler_____________________________________________________________________________________________________________________________

function loadConfig() {
    // read file first
    let rawdata = fs.readFileSync(path.join(__dirname, 'config.json'));
    LHconfig = JSON.parse(rawdata);
}

function saveConfig() {
    // Save config
    let data = JSON.stringify(LHconfig, null, 2);
    fs.writeFileSync(path.join(__dirname, 'config.json'), data);
    // Tell main, config has been updated
    ipcRenderer.send('Config:saved');
}


// LiveSplit Logic__________________________________________________________________________________________________________________________

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

// Swap badges accordingly
ipcRenderer.on('LiveSplit:notRunning', function () {
    $("#LSstate").text("Not Running").addClass("badge-primary").removeClass("badge-success").removeClass("badge-danger").removeClass("badge-warning");
});

ipcRenderer.on('LiveSplit:green', function () {
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

// Web Request Handler___________________________________________________________________________________________________________________________________________________________________

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

// Fields__________________________________________________
// Not Running
$("#Input_request_notrunning").on("focusout", function (e) {
    // Load config
    loadConfig();
    // Change value
    LHconfig.WebRequest_NotRunning = $("#Input_request_notrunning").val();
    // Save config
    saveConfig();
});
// Green
$("#Input_request_green").on("focusout", function (e) {
    // Load config
    loadConfig();
    // Change value
    LHconfig.WebRequest_Green = $("#Input_request_green").val();
    // Save config
    saveConfig();
});
// Red
$("#Input_request_red").on("focusout", function (e) {
    // Load config
    loadConfig();
    // Change value
    LHconfig.WebRequest_Red = $("#Input_request_red").val();
    // Save config
    saveConfig();
});
// Ended
$("#Input_request_ended").on("focusout", function (e) {
    // Load config
    loadConfig();
    // Change value
    LHconfig.WebRequest_Ended = $("#Input_request_ended").val();
    // Save config
    saveConfig();
});
// Personal Best
$("#Input_request_pb").on("focusout", function (e) {
    // Load config
    loadConfig();
    // Change value
    LHconfig.WebRequest_PB = $("#Input_request_pb").val();
    // Save config
    saveConfig();
});


// IFTTT Handler________________________________________________________________________________________________________________________________________________________________________

// Is enabled______________________________________________

$("#iftttCheckmark").on("click", function (e) {
    // Load config
    loadConfig();
    // Change value
    LHconfig.IFTTT_Enabled = $("#iftttCheckmark").prop('checked');
    // Save config
    saveConfig();
    // Handle Content
    if ($("#iftttCheckmark").is(':checked'))
        $("#iftttDiv").show();  // checked
    else
        $("#iftttDiv").hide();  // unchecked
});

// Fields__________________________________________________
// Make Key
$("#Input_ifttt_key").on("focusout", function (e) {
    // Load config
    loadConfig();
    // Change value
    LHconfig.IFTTT_key = $("#Input_ifttt_key").val();
    // Save config
    saveConfig();
});
// Not Running
$("#Input_ifttt_notrunning").on("focusout", function (e) {
    // Load config
    loadConfig();
    // Change value
    LHconfig.IFTTT_NotRunning = $("#Input_ifttt_notrunning").val();
    // Save config
    saveConfig();
});
// Green
$("#Input_ifttt_green").on("focusout", function (e) {
    // Load config
    loadConfig();
    // Change value
    LHconfig.IFTTT_Green = $("#Input_ifttt_green").val();
    // Save config
    saveConfig();
});
// Red
$("#Input_ifttt_red").on("focusout", function (e) {
    // Load config
    loadConfig();
    // Change value
    LHconfig.IFTTT_Red = $("#Input_ifttt_red").val();
    // Save config
    saveConfig();
});
// Ended
$("#Input_ifttt_ended").on("focusout", function (e) {
    // Load config
    loadConfig();
    // Change value
    LHconfig.IFTTT_Ended = $("#Input_ifttt_ended").val();
    // Save config
    saveConfig();
});
// Personal Best
$("#Input_ifttt_pb").on("focusout", function (e) {
    // Load config
    loadConfig();
    // Change value
    LHconfig.IFTTT_PB = $("#Input_ifttt_pb").val();
    // Save config
    saveConfig();
});