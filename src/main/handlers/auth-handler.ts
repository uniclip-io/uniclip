import { IpcMainEvent, ipcMain } from 'electron'
import { getUserCredentials } from '../auth/google-auth'
import channels from '../../channels'
import { setValue } from './store-handler'

ipcMain.handle(channels.AUTH.LOGIN, async (_: IpcMainEvent) => {
	setValue('user', await getUserCredentials())
})

ipcMain.handle(channels.AUTH.LOGOUT, (_: IpcMainEvent) => {
	setValue('user', null)
})
