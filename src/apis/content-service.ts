import axios from 'axios'
import { File, FileType } from '../types/clipboard'

const baseUrl = 'http://127.0.0.1:5046'

export const uploadFile = async (userId: string, file: File, type: FileType): Promise<string> => {
	const form = new FormData()
	form.append('userId', userId)
	form.append('file', file.blob!, file.name)
	form.append('type', type)

	const res = await axios.post(baseUrl + '/store', form)
	return res.data
}

export const downloadFile = async (contentId: string): Promise<[string, NodeJS.ReadableStream]> => {
	const res = await axios.get(baseUrl + '/fetch/' + contentId, { responseType: 'stream' })

	const disposition = res.headers['content-disposition']
	const params = disposition.split(';')
	const name = params[1].replace('filename=', '').replace(/['"]+/g, '').trim()

	return [name, res.data]
}
