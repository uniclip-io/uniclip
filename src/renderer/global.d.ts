import { IpcRendererEvent } from 'electron'

declare global {
	interface Window {
		electron: {
			getStoreData: <T>(key: string) => Promise<T>
			setStoreData: (key: string, value: any) => Promise<T>
			onStoreChanged: (callback: (key: string, value: any) => void) => Promise<void>
			login: () => Promise<void>
			logout: () => Promise<void>
		}
	}
}
