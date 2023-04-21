import { IpcMainEvent, app, ipcMain } from 'electron'
import { AuthService, authenticateClient } from '../auth'
import { connect, disconnect } from '../../apis/dispatch-service'
import channels from '../../channels'
import { setValue } from './store-handler'

ipcMain.handle(channels.AUTH.LOGIN, async (_: IpcMainEvent, service: AuthService) => {
	const user = await authenticateClient(service)
	connect(user.id)
	setValue('user', user)
	app.relaunch()
	app.exit()
})

ipcMain.handle(channels.AUTH.LOGOUT, (_: IpcMainEvent) => {
	disconnect()
	setValue('user', null)
	app.relaunch()
	app.exit()
})
