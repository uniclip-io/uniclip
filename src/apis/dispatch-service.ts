import { WebSocket } from 'ws'
import { Record } from '../types/clipboard'
import { clipboardManager, start, stop } from '../main/clipboard'
import { getValue, setValue } from '../main/handlers/store-handler'

let client: WebSocket | null

export const connect = (userId: string) => {
	client = new WebSocket(process.env.DISPATCH_SERVICE_URL + '/' + userId)
	client.on('message', async message => {
		const data = JSON.parse(message.toString()) as Record
		const record = await clipboardManager.writeClipboard(data)

		if (record) {
			const history = getValue<Record[]>('clipboard') ?? []
			setValue('clipboard', [...history, record])
		}
	})
	start(userId, 100) // TODO - review
}

export const disconnect = () => {
	client && client.close()
	stop()
}
