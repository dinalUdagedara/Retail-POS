const { app, BrowserWindow } = require('electron');
const path = require('path');

async function createWindow() {
  // Dynamically import electron-is-dev
  const isDev = await import('electron-is-dev').then(module => module.default);

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  const startUrl = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, 'out/index.html')}`;

  win.loadURL(startUrl);
  win.webContents.openDevTools();

}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
    
  }
});
