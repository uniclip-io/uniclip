import Clipboard, { Record } from '../types/clipboard'
import axios from 'axios'

const baseUrl = 'http://UniclipLoadBalenciaga-a4675bdbd4a90d2c.elb.eu-north-1.amazonaws.com:4000'

export const postClipboard = async (userId: string, clipboard: Clipboard): Promise<Record> => {
	const { content, type } = clipboard
	const res = await axios.post(baseUrl + '/post', { userId, content, type })
	return res.data as Record
}

export const fetchRecords = async (userId: string): Promise<Record[]> => {
	const res = await axios.get(baseUrl + '/fetch/' + userId)
	return res.data as Record[]
}

export const deleteRecord = async (recordId: string): Promise<void> => {
	await axios.delete(baseUrl + '/delete/' + recordId)
}
