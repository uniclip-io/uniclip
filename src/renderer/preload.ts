import { contextBridge, ipcRenderer } from 'electron'
import channels from '../channels'

contextBridge.exposeInMainWorld('electron', {
	getStoreData: (key: string) => ipcRenderer.invoke(channels.STORE.GET, key),
	setStoreData: (key: string, value: any) => ipcRenderer.invoke(channels.STORE.SET, key, value)
})
