import { postClipboard } from '../../apis/clipboard-api'
import { uploadFile } from '../../apis/content-service'
import ClipboardManager from './clipboard-manager'
import { File } from '../../types/clipboard'

export const clipboardManager = new ClipboardManager()

let timer: NodeJS.Timer | null

export const start = async (userId: string, interval: number) => {
	timer = setInterval(async () => {
		const clipboard = await clipboardManager.readClipboard()

		if (clipboard) {
			if (clipboard.type === 'text') {
				await postClipboard(userId, clipboard)
			} else {
				const file = clipboard.content as File
				await uploadFile(userId, file, clipboard.type)
				// content-api -> clipboard-api -> dispatch-service -> client
			}
		}
	}, interval)
}

export const stop = () => {
	timer && clearInterval(timer)
}
