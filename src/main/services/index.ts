import ClipboardService from './clipboard-service'
import DispatchService from './dispatch-service'

const clipboardService = new ClipboardService()
const dispatchService = new DispatchService(clipboardService)

let timer: NodeJS.Timer | null

export const startListening = async (interval: number) => {
	await clipboardService.readClipboard() // dump clipboard

	timer = setInterval(async () => {
		const clipboard = await clipboardService.readClipboard()

		if (clipboard) {
			dispatchService.sendClipboard(clipboard)
		}
	}, interval)
}

export const stopListening = () => {
	timer && clearInterval(timer)
}
