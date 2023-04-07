import { app, BrowserWindow, nativeImage, Tray } from 'electron'
import DispatchService from './services/dispatch-service'
import ClipboardService from './services/clipboard-service'

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

require('electron-squirrel-startup') && app.quit()

const createWindow = (): void => {
	window = new BrowserWindow({
		height: 600,
		width: 800,
		webPreferences: {
			contextIsolation: false,
			nodeIntegration: true,
			preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
		}
	})

	window.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
	// window.webContents.openDevTools({ mode: 'detach' })

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

	const icon = nativeImage.createFromPath(app.getAppPath() + '/public/tray.png')
	const tray = new Tray(icon.resize({ width: 14, height: 14 }))
	tray.setIgnoreDoubleClickEvents(true)
	tray.on('click', () => !window?.isVisible() && window?.show())
}

let window: BrowserWindow | null
let isQuiting = false

app.on('ready', async () => {
	createWindow()

	const clipboardService = new ClipboardService()
	const dispatchService = new DispatchService()
	await clipboardService.readClipboard() // dump clipboard

	setInterval(async () => {
		const clipboard = await clipboardService.readClipboard()

		if (clipboard) {
			dispatchService.sendClipboard(clipboard)
		}
	}, 100)
})

app.dock.setIcon(nativeImage.createFromPath(app.getAppPath() + '/public/icon.png'))

app.on('before-quit', () => (isQuiting = true))
app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit())
app.on('activate', () => (window ? window.show() : createWindow()))

export { window }
