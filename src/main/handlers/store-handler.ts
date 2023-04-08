import { IpcMainEvent, ipcMain } from 'electron'
import ElectronStore from 'electron-store'
import channels from '../../channels'
import { window } from '..'

const store = new ElectronStore()

export const getValue = <T>(key: string): T => {
	return store.get(key) as T
}

export const setValue = (key: string, value: any) => {
	store.set(key, value)
	window?.webContents.send(channels.STORE.CHANGED, key, value)
}

ipcMain.handle(channels.STORE.GET, (_: IpcMainEvent, key: string) => {
	return store.get(key)
})

ipcMain.handle(channels.STORE.SET, (_: IpcMainEvent, key: string, value: any) => {
	setValue(key, value)
})
