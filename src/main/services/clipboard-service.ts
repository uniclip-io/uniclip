import { app, clipboard } from 'electron'
import Clipboard, { File } from '../../types/clipboard'
import clipboardFiles from 'electron-clipboard-ex'
import archiver from 'archiver'
import unzipper from 'unzipper'
import fs from 'fs-extra'
import path from 'path'
import axios from 'axios'

export default class ClipboardService {
	private readonly outputDir = path.join(app.getAppPath(), 'temp')
	private previous: string

	constructor() {
		if (!fs.existsSync(this.outputDir)) {
			fs.mkdirpSync(this.outputDir)
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
					const outputFile = path.join(app.getPath('desktop'), 'temp.zip')
					const output = fs.createWriteStream(outputFile)
					const archive = archiver('zip', { zlib: { level: 9 } })

					output.on('close', () => {
						const blob = new Blob([fs.readFileSync(outputFile)])
						fs.unlinkSync(outputFile)

						resolve({
							type: files.length > 1 || fs.lstatSync(files[0]).isDirectory() ? 'folder' : 'file',
							content: {
								name: path.basename(files[0]),
								blob
							}
						})
					})

					for (const pth of files) {
						if (fs.lstatSync(pth).isDirectory()) {
							archive.directory(pth, false)
						} else {
							archive.file(pth, { name: path.basename(pth) })
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

	public async writeClipboard(data: Clipboard): Promise<void> {
		if (data.type !== 'text') {
			await fs.emptyDir(this.outputDir)
			const file = data.content as File

			const res = await axios.get('http://192.168.1.185:5046/fetch/' + file.contentId, {
				responseType: 'stream'
			})

			const stream = unzipper.Extract({ path: this.outputDir })
			stream.on('close', () => {
				const paths = fs.readdirSync(this.outputDir).map(p => path.join(this.outputDir, p))
				clipboardFiles.writeFilePaths(paths)
				this.previous = clipboard.readText()
			})
			res.data.pipe(stream)
		} else {
			clipboard.writeText(data.content as string)
		}
	}
}
