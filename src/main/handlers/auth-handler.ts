import { IpcMainEvent, ipcMain } from 'electron'
import { AuthService, authenticateClient } from '../auth'
import { connect, disconnect } from '../../apis/dispatch-service'
import channels from '../../channels'
import { setValue } from './store-handler'

ipcMain.handle(channels.AUTH.LOGIN, async (_: IpcMainEvent, service: AuthService) => {
	const user = await authenticateClient(service)
	connect(user.id, 'ws://localhost:8000')
	setValue('user', user)
})

ipcMain.handle(channels.AUTH.LOGOUT, (_: IpcMainEvent) => {
	disconnect()
	setValue('user', null)
})
