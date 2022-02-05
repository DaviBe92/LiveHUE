const electron = require('electron');
const path = require('path')
const LiveSplitClient = require('livesplit-client');
const https = require('https');
var tcpp = require('tcp-ping');
const url = require('url');

const {app, BrowserWindow, Menu, ipcMain} = electron;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let LHconfig;
let client;
let LScheckInterval;
// States: NotRunning, Red, Green, Ended
let lastState = "start"
let pb;


const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true, // allows access to 'process' of node, and use of 'require'
       contextIsolation: false
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Remove Menubar
  mainWindow.removeMenu()

  // Disable rezise
  mainWindow.setResizable(false)

  console.log("index ready!");

  // read config JSON
  loadConfig();

  // Create LiveSplit handler
  handleLiveSplit();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });


};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// Read Config
function loadConfig() {
  const fs = require('fs');
  let rawdata = fs.readFileSync('./src/config.json');
  LHconfig = JSON.parse(rawdata);
}


// LiveSplit Handler
async function handleLiveSplit() {
  try {
    // Initialize client with LiveSplit Server's IP:PORT
    client = new LiveSplitClient(LHconfig.LiveSplit_IP);

    // Connected event
    client.on('connected', () => {
      console.log('Connected!');
      LScheckInterval = setInterval(getState, 1000);
    });

    // Disconnected event
    client.on('disconnected', () => {
      console.log('Disconnected!');
      clearInterval(LScheckInterval);
    });

    // Raw data reciever
    client.on('data', (data) => {
      //  console.log('Debug data:', data);
    });

    // Some async sleep sugar for this example
    const sleep = (time) => {
      return new Promise((r) => {
        setTimeout(() => r(), time);
      });
    };

    // Connect to the server, Promise will be resolved when the connection will be succesfully established
    if (LHconfig.LiveSplit_autoconnect == true) {
      connectLiveSplitServer();
    }

    // Job done, now we can close this connection
    //client.disconnect();

  } catch (err) {
    // console.error(err); // Something went wrong
  }
}

async function getState() {

  // Get Run State
  let splitState = await client.getCurrentTimerPhase();

  // When running check splits 
  if (splitState === "Running") {

    // when starting a new run, check and save PB
    if (await client.getSplitIndex() == 0 && lastState === "NotRunning") {
      pb = await client.getFinalTime();
      console.log("PB Set " + parseFloat(pb.replace(':', '')));
    }

    // Check Split Delta
    const splitDelta = await client.getDelta();
    if (splitDelta > 0) {
      splitState = "Red";
    } else {
      splitState = "Green;"
    }
  } else if (splitState === "Ended") {
    let curr = await client.getFinalTime();
    if (parseFloat(curr.replace(':', '')) < parseFloat(pb.replace(':', ''))) {
      splitState = "PersonalBest"
    }

  }

  // Check if state has changed
  if (lastState !== splitState) {
    console.log("State: " + splitState);
    lastState = splitState;
  }
}

// Ping LiveSplit server to see if it is started, then connect to it
function connectLiveSplitServer() {
  // split IP and Port
  let ipArray = LHconfig.LiveSplit_IP.split(":")
  tcpp.probe(ipArray[0], parseInt(ipArray[1]), function (err, available) {
    if (available) {
      client.connect();
    }
  });
}