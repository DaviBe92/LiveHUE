'use strict';
// Read Config
const fs = require('fs');
let rawdata = fs.readFileSync('./src/config.json');
let LHconfig = JSON.parse(rawdata);

// Fill GUI from config
window.addEventListener('DOMContentLoaded', () => {

// LiveSplit

document.getElementById("InputIPLivesplit").value = LHconfig.LiveSplit_IP;

document.getElementById("LiveSplit_autoconnect").checked = LHconfig.LiveSplit_autoconnect;

// Web Request



//IFTTT



// Nanoleaf



// Phillips HUE



})