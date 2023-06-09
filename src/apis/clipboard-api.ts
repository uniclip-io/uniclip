import Clipboard, { Record } from '../types/clipboard'
import axios from 'axios'

export const postClipboard = async (userId: string, clipboard: Clipboard): Promise<Record> => {
	const { content, type } = clipboard
	const res = await axios.post(process.env.CLIPBOARD_API_URL + '/post', { userId, content, type })
	return res.data as Record
}

export const fetchRecords = async (userId: string): Promise<Record[]> => {
	const res = await axios.get(process.env.CLIPBOARD_API_URL + '/fetch/' + userId)
	return res.data as Record[]
}

export const deleteRecord = async (recordId: string): Promise<void> => {
	await axios.delete(process.env.CLIPBOARD_API_URL + '/delete/' + recordId)
}
