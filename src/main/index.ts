import { app, BrowserWindow, nativeImage, Tray } from 'electron'
import { getValue } from './handlers/store-handler'
import { connect } from '../apis/dispatch-service'
import UserProfile from '../types/user'

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

require('electron-squirrel-startup') && app.quit()

const createWindow = (): void => {
	window = new BrowserWindow({
		height: 600,
		width: 400,
		resizable: false,
		titleBarStyle: 'hiddenInset',
		webPreferences: {
			nodeIntegration: true,
			preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
		}
	})

	window.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
	window.webContents.openDevTools({ mode: 'detach' })

	window.on('minimize', (event: Event) => {
		event.preventDefault()
		window?.hide()
	})

	window.on('close', (event: any) => {
		if (!isQuiting) {
			event.preventDefault()
			window?.hide()
		}
		return false
	})

	const icon = nativeImage.createFromPath(app.getAppPath() + '/assets/tray.png')
	const tray = new Tray(icon.resize({ width: 14, height: 14 }))
	tray.setIgnoreDoubleClickEvents(true)
	tray.on('click', () => !window?.isVisible() && window?.show())
}

let window: BrowserWindow | null
let isQuiting = false

app.dock.setIcon(nativeImage.createFromPath(app.getAppPath() + '/assets/icon.png'))

app.on('ready', () => {
	createWindow()

	const user = getValue('user') as UserProfile
	if (user) {
		connect(user.id, 'ws://localhost:8000')
	}
})
app.on('before-quit', () => (isQuiting = true))
app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit())
app.on('activate', () => (window ? window.show() : createWindow()))

export { window }

import './handlers'

// require('../store').store.clear()
