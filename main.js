// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
const { ipcMain } = require('electron')
let tooltipData = process.argv[2]



// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Custom Tooltip",
    frame: false,
    transparent: true,
    resizable: false,
    alwaysOnTop: true,
    backgroundColor: '#5a000000',
    useContentSize : true,
    //skipTaskbar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`)
  mainWindow.hide()

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  mainWindow.webContents.on('did-finish-load', () => {

  });

  /*
  mainWindow.on('move',(e) =>{
    console.log('electron move');
  });
  mainWindow.on('minimize',(e) =>{
    console.log('electron minimize');
  });
  mainWindow.on('maximize',(e) =>{
    console.log('electron maximize');
  });
  mainWindow.on('restore',(e) =>{
    console.log('electron restore');
  });
  */
  
  // Hook WM_GETTEXT
  // http://robmayhew.com/listening-for-events-from-windows-in-electron-tutorial/
  mainWindow.hookWindowMessage(Number.parseInt('0x000d'), (wParam,lParam)=>{
      let eventName = null;
      console.log(" Hooked WM_GETTEXT")
      mainWindow.reload()
  });

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on('set-window-size', (event, arg) => {
  mainWindow.setSize(arg[0],arg[1])
  mainWindow.show()
  mainWindow.setIgnoreMouseEvents(true);
})