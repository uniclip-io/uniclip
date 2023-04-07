import { app, BrowserWindow } from 'electron'

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

require('electron-squirrel-startup') && app.quit()

const createWindow = (): void => {
	const window = new BrowserWindow({
		height: 600,
		width: 800,
		webPreferences: {
			contextIsolation: false,
			nodeIntegration: true,
			preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
		}
	})

	window.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
	window.webContents.openDevTools({ mode: 'detach' })
}

app.on('ready', createWindow)
app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit())
app.on('activate', () => (!BrowserWindow.getAllWindows() ? createWindow() : BrowserWindow.getAllWindows()[0].show()))
