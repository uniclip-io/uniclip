import { app, clipboard } from 'electron'
import Clipboard, { FileType, Record } from '../../types/clipboard'
import { downloadFile } from '../../apis/content-service'
import clipboardFiles from 'electron-clipboard-ex'
import archiver from 'archiver'
import unzipper from 'unzipper'
import fs from 'fs-extra'
import path from 'path'

export default class ClipboardManager {
	private readonly tempDir = path.join(app.getAppPath(), 'temp')
	private previous: string

	constructor() {
		if (!fs.existsSync(this.tempDir)) {
			fs.mkdirpSync(this.tempDir)
		}
		this.previous = clipboard.readText()
	}

	public async readClipboard(): Promise<Clipboard | null> {
		if (this.previous == clipboard.readText()) {
			return null
		} else {
			this.previous = clipboard.readText()
			const files = clipboardFiles.readFilePaths()

			if (files.length > 0) {
				return new Promise(async resolve => {
					const outputFile = path.join(this.tempDir, 'temp.zip')
					const output = fs.createWriteStream(outputFile)
					const archive = archiver('zip', { zlib: { level: 9 } })

					output.on('close', () => {
						const blob = new Blob([fs.readFileSync(outputFile)])
						fs.unlinkSync(outputFile)

						const type = this.getFileRecordType(files)
						const name = this.getFileRecordName(type, files)

						resolve({
							type,
							content: {
								name,
								blob
							}
						})
					})

					for (const pth of files) {
						const name = path.basename(pth)

						if (fs.lstatSync(pth).isDirectory()) {
							archive.directory(pth, name)
						} else if (name !== '.DS_Store') {
							archive.file(pth, { name })
						}
					}

					archive.pipe(output)
					await archive.finalize()
				})
			}
			return {
				type: 'text',
				content: this.previous
			}
		}
	}

	public async writeClipboard(record: Record): Promise<Record> {
		if (record.type !== 'text') {
			await fs.emptyDir(this.tempDir)
			const contentId = record.content as string
			const [name, res] = await downloadFile(contentId)

			const stream = unzipper.Extract({ path: this.tempDir })

			stream.on('close', () => {
				const paths = fs
					.readdirSync(this.tempDir)
					.filter(n => n !== '.DS_Store')
					.map(n => path.join(this.tempDir, n))

				clipboardFiles.writeFilePaths(paths)
				this.previous = clipboard.readText()
			})
			res.pipe(stream)

			return {
				...record,
				content: {
					name,
					contentId
				}
			}
		} else {
			clipboard.writeText(record.content as string)
			this.previous = clipboard.readText()
			return record
		}
	}

	private getFileRecordType(files: string[]): FileType {
		return files.length > 1
			? 'diverse'
			: fs.lstatSync(files[0]).isDirectory()
			? 'folder'
			: 'file'
	}

	private getFileRecordName(type: FileType, files: string[]): string {
		return type === 'diverse'
			? files.map(f => path.basename(f)).join(', ')
			: path.basename(files[0])
	}
}
