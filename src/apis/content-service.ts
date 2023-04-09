import axios from 'axios'
import { File } from '../types/clipboard'

const baseUrl = 'http://192.168.1.185:5046'

export const upload = async (file: File): Promise<string> => {
	const form = new FormData()
	form.append('file', file.blob!, file.name)
	const res = await axios.post(baseUrl + '/store', form)
	return res.data
}

export const download = async (contentId: string): Promise<NodeJS.ReadableStream> => {
	const url = baseUrl + '/fetch/' + contentId
	const res = await axios.get(url, { responseType: 'stream' })
	return res.data
}
