import { contextBridge, ipcRenderer } from 'electron'
import channels from '../channels'

contextBridge.exposeInMainWorld('electron', {
	getStoreData: (key: string) => ipcRenderer.invoke(channels.STORE.GET, key),
	setStoreData: (key: string, value: any) => ipcRenderer.invoke(channels.STORE.SET, key, value),
	onStoreChanged: (callback: (key: string, value: any) => void) => ipcRenderer.on(channels.STORE.CHANGED, (_, key, value) => callback(key, value)),
	login: () => ipcRenderer.invoke(channels.AUTH.LOGIN),
	logout: () => ipcRenderer.invoke(channels.AUTH.LOGOUT)
})
