import { WebSocket } from 'ws'
import { Record } from '../types/clipboard'
import { clipboardManager, start, stop } from '../main/clipboard'

let client: WebSocket | null

export const connect = (userId: string, host: string) => {
	client = new WebSocket(host)
	client.on('message', async message => {
		const data = JSON.parse(message.toString()) as Record
		const record = await clipboardManager.writeClipboard(data)
		clipboardManager.log(record, 'inbound')
	})
	start(userId, 100) // TODO - review
}

export const disconnect = () => {
	client && client.close()
	stop() // TODO - review
}
