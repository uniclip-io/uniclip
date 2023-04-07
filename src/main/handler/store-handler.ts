import { IpcMainEvent, ipcMain } from 'electron'
import ElectronStore from 'electron-store'
import channels from '../../channels'

const store = new ElectronStore()

ipcMain.handle(channels.STORE.GET, (_: IpcMainEvent, key: string) => {
	return store.get(key)
})

ipcMain.handle(channels.STORE.SET, (_: IpcMainEvent, key: string, value: any) => {
	store.set(key, value)
})
