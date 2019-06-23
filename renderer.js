// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const { ipcRenderer } = require('electron')

var wrapperWidth = document.getElementById('wrapper').offsetWidth;
var wrapperHeight = document.getElementById('wrapper').offsetHeight;
var sizeArr = [wrapperWidth, wrapperHeight];
ipcRenderer.send('set-window-size', sizeArr)