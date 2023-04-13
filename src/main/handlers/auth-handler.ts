import { IpcMainEvent, ipcMain } from 'electron'
import { AuthService, authenticateClient } from '../auth'
import channels from '../../channels'
import { setValue } from './store-handler'

ipcMain.handle(channels.AUTH.LOGIN, async (_: IpcMainEvent, service: AuthService) => {
	setValue('user', await authenticateClient(service))
})

ipcMain.handle(channels.AUTH.LOGOUT, (_: IpcMainEvent) => {
	setValue('user', null)
})
