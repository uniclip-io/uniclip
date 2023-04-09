import { app, clipboard } from 'electron'
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

			if (
				!this.previous ||
				this.previous.type !== 'file' ||
				this.previous.content !== filePath
			) {
				this.previous = { type: 'file', content: filePath }

				return fs.lstatSync(filePath).isDirectory()
					? await this.getDirectoryContent(filePath)
					: this.getFileContent(filePath)
			}
		} else {
			const content = clipboard.readText()

			if (
				!this.previous ||
				this.previous.type !== 'text' ||
				this.previous.content !== content
			) {
				return (this.previous = { type: 'text', content })
			}
		}
		return null
	}

	public async writeClipboard(data: Clipboard): Promise<void> {
		if (data.type !== 'text') {
			const { contentId, name } = data.content as File

			const outputFile = path.join(app.getAppPath(), name)
			const res = await axios.get('http://192.168.1.185:5046/fetch/' + contentId, {
				responseType: 'stream'
			})

			const file = fs.createWriteStream(outputFile)
			file.on('finish', () => {
				file.close()
				this.writeFile(outputFile)
			})

			res.data.pipe(file)
		} else {
			clipboard.writeText(data.content as string)
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
			const outputFile = path.join(app.getAppPath(), name)

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

	private writeFile(path: string) {
		if (process.platform === 'darwin') {
			clipboard.writeBuffer(
				'NSFilenamesPboardType',
				Buffer.from(`
        <?xml version="1.0" encoding="UTF-8"?>
        <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
        <plist version="1.0">
          <array>
            <string>${path}</string>
          </array>
        </plist>
      `)
			)
		} else if (process.platform === 'win32') {
		}
	}
}
