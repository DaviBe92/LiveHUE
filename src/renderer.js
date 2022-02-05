 const electron = require('electron');
 const { ipcRenderer } = electron;

const form = document.querySelector('form');
form.addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();
    console.log("1234");
}

// Tab switching
$('.tabAnchor').on('click', function () { // changes container bg to tab color stored in data attr
    var destBg = $(this).data('color');
    $('.tab-content').css('background', destBg);
});


// LiveSplit Logic

function connectLiveSplit() {
    console.log("pressed")


    $("#btn_livesplit_connect").text("Disconnect").addClass("btn-danger").removeClass("btn-primary")

    // $("#btn_livesplit_connect").text("Connect").addClass("btn-primary").removeClass("btn-danger")
}