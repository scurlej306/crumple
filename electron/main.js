const { app, BrowserWindow, ipcMain, Menu } = require('electron');
if (require('electron-squirrel-startup')) app.quit();
const path = require('path');
const { loadFile, getDataRecords } = require(path.join(__dirname, '../engine/file-loader.js'));
const { execute } = require(path.join(__dirname, '../engine/query.js'));

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
    },
  });

  ipcMain.handle('loadFile', (event, file) => loadFile(file));
  ipcMain.handle('submitQuery', (event, queryParams) => execute(queryParams, getDataRecords()));
  win.loadFile(path.join(__dirname, '../frontend/index.html'));
};

app.whenReady().then(() => {
  createWindow();
  const menu = new Menu();
  Menu.setApplicationMenu(menu);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});