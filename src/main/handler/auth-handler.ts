import { IpcMainEvent, ipcMain } from 'electron'
import channels from '../../channels'
import { setValue } from './store-handler'
import { getUserCredentials } from '../auth/google-auth'

ipcMain.handle(channels.AUTH.LOGIN, async (_: IpcMainEvent) => {
	const credentials = await getUserCredentials()
	setValue('user', credentials)
})

ipcMain.handle(channels.AUTH.LOGOUT, (_: IpcMainEvent) => {
	setValue('user', null)
})
