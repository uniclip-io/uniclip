import { IpcMainEvent, ipcMain } from 'electron'
import channels from '../../channels'
import { Record } from '../../types/clipboard'
import { clipboardManager } from '../clipboard'
import { getValue } from './store-handler'

ipcMain.handle(channels.CLIPBOARD.COPY, async (_: IpcMainEvent, recordId: string) => {
	const clipboard = getValue<Record[]>('clipboard') ?? []
	const record = clipboard.find(r => r.id === recordId)

	if (record) {
		const content =
			typeof record.content == 'string' ? record.content : record.content.contentId!
		await clipboardManager.writeClipboard({ ...record, content })
	}
})
