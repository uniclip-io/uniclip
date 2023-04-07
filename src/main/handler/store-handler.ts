import { IpcMainEvent, ipcMain } from 'electron'
import ElectronStore from 'electron-store'

const store = new ElectronStore()

ipcMain.handle('store.get', (_: IpcMainEvent, key: string) => {
	return store.get(key)
})

ipcMain.handle('store.set', (_: IpcMainEvent, key: string, value: any) => {
	store.set(key, value)
})
