import { WebSocket } from 'ws'
import Clipboard, { File } from '../../types/clipboard'
import ClipboardService from './clipboard-service'
import axios from 'axios'

export default class DispatchService {
	private readonly clipboardService: ClipboardService
	private readonly client: WebSocket

	constructor(clipboardService: ClipboardService) {
		this.clipboardService = clipboardService
		this.client = new WebSocket('ws://192.168.1.185:8000')
		this.client.on('message', this.receiveClipboard.bind(this))
	}

	public async sendClipboard(data: Clipboard) {
		if (data.type === 'file') {
			const file = data.content as File
			const form = new FormData()
			form.append('file', file.blob, file.name)

			const res = await axios.post('http://192.168.1.185:5046/store', form)
			const message = { type: 'file', content: res.data }
			this.client.send(JSON.stringify(message))
		} else {
			this.client.send(JSON.stringify(data))
		}
	}

	private async receiveClipboard(message: string) {
		const data = JSON.parse(message) as Clipboard
		await this.clipboardService.writeClipboard(data)
	}
}
