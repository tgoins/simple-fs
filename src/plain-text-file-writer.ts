import { FileWriter } from './file-writer'
import { PlainTextFile } from './plain-text-file'
import { writeFileSync } from 'fs'

type File = PlainTextFile

export class PlainTextFileWriter implements FileWriter<string, File> {
  public write(file: File, ...data: string[]) {
    file.fileText = data.join('')
    writeFileSync(file.filePath, file.fileText)
  }

  public append(file: File, ...data: string[]) {
    file.fileText += data.join('')
    writeFileSync(file.filePath, file.fileText)
  }
}
