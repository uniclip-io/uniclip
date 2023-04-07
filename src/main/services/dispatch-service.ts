import { WebSocket } from 'ws'
import Clipboard, { File } from '../../types/clipboard'
import axios from 'axios'
import { clipboard } from 'electron'
import fs from 'fs'

export default class DispatchService {
	private readonly client: WebSocket

	constructor() {
		this.client = new WebSocket('ws://192.168.1.185:8000')
		this.client.on('message', this.receiveClipboard)
	}

	public async sendClipboard(clipboard: Clipboard) {
		if (clipboard.type === 'file') {
			const file = clipboard.content as File
			const form = new FormData()
			form.append('file', file.blob, file.name)

			const res = await axios.post('http://192.168.1.185:5046/store', form)
			const message = { type: 'file', content: res.data }
			this.client.send(JSON.stringify(message))
		} else {
			this.client.send(JSON.stringify(clipboard))
		}
	}

	private async receiveClipboard(message: string) {
		const data = JSON.parse(message) as Clipboard
		const content = data.content as string

		if (data.type === 'file') {
			const res = await axios.get('http://192.168.1.185:5046/fetch/' + content, {
				responseType: 'stream'
			})

			const disposition = res.headers['content-disposition'] ?? content
			const fileName = disposition.split(';')[1].replace('filename=', '').replace(/['"]+/g, '').trim()
			const file = fs.createWriteStream('/Users/noahgreff/Desktop/' + fileName)

			res.data.pipe(file)
			file.on('finish', file.close)
		} else {
			clipboard.writeText(content)
		}
	}
}
