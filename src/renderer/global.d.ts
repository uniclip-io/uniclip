import { IpcRendererEvent } from 'electron'
import { Credentials } from '../types/user'

declare global {
	interface Window {
		electron: {
			getStoreData: <T>(key: string) => Promise<T>
			setStoreData: (key: string, value: any) => Promise<T>
		}
	}
}
