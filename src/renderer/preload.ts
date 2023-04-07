import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electron', {
	getStoreData: (key: string) => ipcRenderer.invoke('store.get', key),
	setStoreData: (key: string, value: any) => ipcRenderer.invoke('store.set', key, value)
})
