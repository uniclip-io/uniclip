import { IpcMainEvent, ipcMain } from 'electron'
import ElectronStore from 'electron-store'
import channels from '../../channels'
import { window } from '..'

export const Schema = {
	example: {
		default: {
			mabite: true
		}
	},
	example_too: {
		default: 'text'
	}
}

const store = new ElectronStore({ schema: Schema })

ipcMain.handle(channels.STORE.GET, (_: IpcMainEvent, key: string) => {
	return store.get(key)
})

ipcMain.handle(channels.STORE.SET, (_: IpcMainEvent, key: string, value: any) => {
	store.set(key, value)
	window?.webContents.send(channels.STORE.CHANGED, key, value)
})
