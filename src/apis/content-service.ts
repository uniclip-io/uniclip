import { File, FileType } from '../types/clipboard'
import axios, { AxiosError } from 'axios'

export const uploadFile = async (userId: string, file: File, type: FileType): Promise<string | undefined> => {
	const form = new FormData()
	form.append('userId', userId)
	form.append('file', file.blob!, file.name)
	form.append('type', type)

	try {
		const res = await axios.post(process.env.CONTENT_API_URL + '/store', form)
		return res.data
	} catch (exception) {
		if (exception instanceof AxiosError) {
			console.error('uploadFile', exception.message)
		}
	}
}

export const downloadFile = async (contentId: string): Promise<[string, NodeJS.ReadableStream] | undefined> => {
	try {
		const res = await axios.get(process.env.CONTENT_API_URL + '/fetch/' + contentId, { responseType: 'stream' })

		const disposition = res.headers['content-disposition']
		const params = disposition.split(';')
		const name = params[1].replace('filename=', '').replace(/['"]+/g, '').trim()

		return [name, res.data]
	} catch (exception) {
		if (exception instanceof AxiosError) {
			console.error('downloadFile', exception.message)
		}
	}
}
