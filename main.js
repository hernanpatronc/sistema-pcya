const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron')
const fs = require('fs');

let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1280,
    height: 720,
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}/dist/assets/logo.png`
  })


  win.loadURL(`file://${__dirname}/dist/index.html`)

  //// uncomment below to open the DevTools.
  // win.webContents.openDevTools()

  // Event when the window is closed.
  win.on('closed', function () {
    win = null
  })
}

// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
let print_win;
ipcMain.on("print", (event, args) => {
  if (args) {
    let html = args
    print_win = new BrowserWindow({ autoHideMenuBar: true, show: false });
    print_win.loadURL("data:text/html;charset=utf-8," + encodeURI(html));
  }
  else {
    print_win = BrowserWindow.fromWebContents(event.sender)
  }

  // print_win.show();
  dialog.showSaveDialog(print_win, {}, function (file_path) {
    if (file_path) {
      print_win.webContents.printToPDF({
        landscape: false,
        marginsType: 0,
        printBackground: true,
        printSelectionOnly: false,
        pageSize: 'A4',
      }, function (err, data) {
        if (err) {
          dialog.showErrorBox('Error', err.message);
          return;
        }
        fs.writeFile(file_path, data, function (err) {
          if (err) {
            dialog.showErrorBox('Error', err);
            return;
          }
          let save_pdf_path = file_path;
          if (!save_pdf_path) {
            dialog.showErrorBox('Error', "You should save the pdf before viewing it");
            return;
          }
          shell.openItem(save_pdf_path);
          print_win.close();
        });
      });
    }
    else {
      print_win.close();
    }
    // print_win.close();
  });
})

app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow()
  }
})