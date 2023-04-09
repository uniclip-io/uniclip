import { clipboard } from 'electron'
import Clipboard, { File } from '../../types/clipboard'
import archiver from 'archiver'
import fs from 'fs'
import path from 'path'
import axios from 'axios'

export default class ClipboardService {
	private previous: Clipboard | null

	public async readClipboard(): Promise<Clipboard | null> {
		const isMacOS = process.platform === 'darwin'
		const fileFormat = isMacOS ? 'public.file-url' : 'FileNameW'

		if (clipboard.has(fileFormat)) {
			const fileData = clipboard.read(fileFormat)
			const filePath = isMacOS
				? decodeURIComponent(fileData.replace('file://', ''))
				: fileData.replace(new RegExp(String.fromCharCode(0), 'g'), '')

			if (!this.previous || this.previous.type !== 'file' || this.previous.content !== filePath) {
				this.previous = { type: 'file', content: filePath }

				return fs.lstatSync(filePath).isDirectory() ? await this.getDirectoryContent(filePath) : this.getFileContent(filePath)
			}
		} else {
			const content = clipboard.readText()

			if (!this.previous || this.previous.type !== 'text' || this.previous.content !== content) {
				return (this.previous = { type: 'text', content })
			}
		}
		return null
	}

	public async writeClipboard(data: Clipboard): Promise<void> {
		const content = data.content as string

		if (data.type !== 'text') {
			const res = await axios.get('http://192.168.1.185:5046/fetch/' + content, {
				responseType: 'stream'
			})

			const disposition = res.headers['content-disposition'] ?? content
			const fileName = disposition.split(';')[1].replace('filename=', '').replace(/['"]+/g, '').trim()
			const file = fs.createWriteStream('/Users/noahgreff/Desktop/' + fileName)

			res.data.pipe(file)
			file.on('finish', file.close)
		} else {
			clipboard.writeText(content)
		}
	}

	private getFileContent(filePath: string): Clipboard {
		return {
			type: 'file',
			content: {
				name: path.basename(filePath),
				blob: new Blob([fs.readFileSync(filePath)])
			}
		}
	}

	private async getDirectoryContent(directoryPath: string): Promise<Clipboard> {
		return new Promise(async resolve => {
			const name = path.basename(directoryPath) + '.zip'
			const outputFile = path.join(process.cwd(), name)

			const output = fs.createWriteStream(outputFile)
			const archive = archiver('zip', { zlib: { level: 9 } })

			output.on('close', () => {
				const blob = new Blob([fs.readFileSync(outputFile)])
				fs.unlinkSync(outputFile)

				resolve({
					type: 'folder',
					content: {
						name,
						blob
					}
				})
			})

			archive.pipe(output)
			archive.directory(directoryPath, false)
			await archive.finalize()
		})
	}
}
