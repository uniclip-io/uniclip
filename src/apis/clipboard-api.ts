import Clipboard, { Record } from '../types/clipboard'
import axios, { AxiosError } from 'axios'

export const postClipboard = async (userId: string, clipboard: Clipboard): Promise<Record | undefined> => {
	try {
		const { content, type } = clipboard
		const res = await axios.post(process.env.CLIPBOARD_API_URL + '/post', { userId, content, type })
		return res.data as Record
	} catch (exception) {
		if (exception instanceof AxiosError) {
			console.error('postClipboard', exception.message)
		}
	}
}

export const fetchRecords = async (userId: string): Promise<Record[] | undefined> => {
	try {
		const res = await axios.get(process.env.CLIPBOARD_API_URL + '/fetch/' + userId)
		return res.data as Record[]
	} catch (exception) {
		if (exception instanceof AxiosError) {
			console.error('fetchRecords', exception.message)
		}
	}
}

export const deleteRecord = async (recordId: string): Promise<void> => {
	try {
		await axios.delete(process.env.CLIPBOARD_API_URL + '/delete/' + recordId)
	} catch (exception) {
		if (exception instanceof AxiosError) {
			console.error('deleteRecord', exception.message)
		}
	}
}
