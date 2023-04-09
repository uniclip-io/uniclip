import { app, clipboard } from 'electron'
import Clipboard, { File } from '../../types/clipboard'
import clipboardFiles from 'electron-clipboard-ex'
import { download } from '../../apis/content-service'
import archiver from 'archiver'
import unzipper from 'unzipper'
import fs from 'fs-extra'
import path from 'path'

export default class ClipboardService {
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

						// prettier-ignore
						const type =files.length > 1 ? 'diverse': fs.lstatSync(files[0]).isDirectory() ? 'folder' : 'file'
						// prettier-ignore
						const name = type === 'diverse' ? 'Files & Folders' : path.basename(files[0])

						resolve({
							type,
							content: {
								name,
								blob
							}
						})
					})

					for (const pth of files) {
						if (fs.lstatSync(pth).isDirectory()) {
							archive.directory(pth, false)
						} else {
							const name = path.basename(pth)

							// TODO - review
							if (name !== '.DS_Store') {
								archive.file(pth, { name })
							}
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
			await fs.emptyDir(this.tempDir)
			const { contentId, name } = data.content as File
			const outputAs = data.type === 'diverse' ? this.tempDir : path.join(this.tempDir, name)

			const res = await download(contentId!)

			const stream = unzipper.Extract({ path: outputAs })
			stream.on('close', () => {
				const paths = fs.readdirSync(outputAs).map(p => path.join(outputAs, p))
				clipboardFiles.writeFilePaths(paths)
				this.previous = clipboard.readText()
			})
			res.pipe(stream)
		} else {
			clipboard.writeText(data.content as string)
		}
	}
}
