import { IpcRendererEvent } from 'electron'
import { AuthService } from 'src/main/auth'

declare global {
	interface Window {
		electron: {
			getStoreData: <T>(key: string) => Promise<T>
			setStoreData: (key: string, value: any) => Promise<T>
			onStoreChanged: (callback: (key: string, value: any) => void) => Promise<void>
			login: (service: AuthService) => Promise<void>
			logout: () => Promise<void>
		}
	}
}
