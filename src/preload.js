'use strict';
// Read Config
const fs = require('fs');
const path = require('path')
let rawdata = fs.readFileSync(path.join(__dirname, 'config.json'));
let LHconfig = JSON.parse(rawdata);

// Fill GUI from config
window.addEventListener('DOMContentLoaded', () => {

    // LiveSplit

    document.getElementById("InputIPLivesplit").value = LHconfig.LiveSplit_IP;
    document.getElementById("LiveSplit_autoconnect").checked = LHconfig.LiveSplit_autoconnect;

    // Web Request

    if (LHconfig.WebRequest_Enabled) {
        $("#requestDiv").show();  // checked
        $("#requestCheckmark").prop('checked', true);
    } else {
        $("#requestDiv").hide();  // unchecked
    }
    $("#Input_request_notrunning").val(LHconfig.WebRequest_NotRunning);
    $("#Input_request_green").val(LHconfig.WebRequest_Green);
    $("#Input_request_red").val(LHconfig.WebRequest_Red);
    $("#Input_request_ended").val(LHconfig.WebRequest_Ended);
    $("#Input_request_pb").val(LHconfig.WebRequest_PB);

    //IFTTT

    if (LHconfig.IFTTT_Enabled) {
        $("#iftttDiv").show();  // checked
        $("#iftttCheckmark").prop('checked', true);
    } else {
        $("#iftttDiv").hide();  // unchecked
    }
    $("#Input_ifttt_key").val(LHconfig.IFTTT_key);
    $("#Input_ifttt_notrunning").val(LHconfig.IFTTT_NotRunning);
    $("#Input_ifttt_green").val(LHconfig.IFTTT_Green);
    $("#Input_ifttt_red").val(LHconfig.IFTTT_Red);
    $("#Input_ifttt_ended").val(LHconfig.IFTTT_Ended);
    $("#Input_ifttt_pb").val(LHconfig.IFTTT_PB);

    // Nanoleaf



    // Phillips HUE



})