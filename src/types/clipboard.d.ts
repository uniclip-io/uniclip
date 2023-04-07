export default interface Clipboard {
  type: 'text' | 'file'
  content: string | File
}

export type File = {
  name: string
  blob: Blob 
}
