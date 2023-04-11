import { WebSocket } from 'ws'
import Clipboard, { ClipboardLog, File } from '../../types/clipboard'
import { Direction } from '../../types/message'
import ClipboardService from './clipboard-service'
import { getValue, setValue } from '../handlers/store-handler'
import { upload } from '../../apis/content-service'

export default class DispatchService {
	private readonly clipboardService: ClipboardService
	private readonly client: WebSocket

	constructor(clipboardService: ClipboardService) {
		this.clipboardService = clipboardService
		this.client = new WebSocket('ws://192.168.0.200:8000')
		this.client.on('message', this.receiveClipboard.bind(this))
	}

	public async sendClipboard(data: Clipboard) {
		if (data.type !== 'text') {
			const file = data.content as File
			const contentId = await upload(file)
			const content = { contentId, name: file.name }
			const message = { type: data.type, content }

			this.client.send(JSON.stringify(message))
			this.logClipboard(message, 'outbound')
		} else {
			this.client.send(JSON.stringify(data))
			this.logClipboard(data, 'outbound')
		}
	}

	private async receiveClipboard(message: string) {
		const data = JSON.parse(message) as Clipboard
		this.logClipboard(data, 'inbound')
		await this.clipboardService.writeClipboard(data)
	}

	private logClipboard(clipboard: Clipboard, direction: Direction) {
		const history = getValue<ClipboardLog[]>('clipboard') ?? []
		const log = { clipboard, direction: direction }
		setValue('clipboard', [...history, log])
	}
}
