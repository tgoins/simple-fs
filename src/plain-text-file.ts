import { BaseFile } from './base-file'
import { PlainTextFileWriter } from './plain-text-file-writer'
import { IndexedFile } from './file'

export class PlainTextFile extends BaseFile<string, PlainTextFileWriter>
  implements IndexedFile<string> {
  public fileText: string

  public constructor(public readonly filePath: string) {
    super(filePath, PlainTextFileWriter)
    this.fileText = this.readAllText()
  }

  public replace(key: number | RegExp, value: string): this {
    if (this.isRegex(key)) {
      this.replaceRegex(key, value)
    } else {
      const lines = this.readAllLines()
      lines[key] = value
      this.write(lines.join('\n'))
    }

    return this
  }

  private isRegex(value: RegExp | number): value is RegExp {
    return value instanceof RegExp
  }

  private replaceRegex(regex: RegExp, value: string) {
    let newFile = this.fileText

    regex = new RegExp(regex.source, 'g')

    let m = regex.exec(this.fileText)
    while (m) {
      newFile = newFile.replace(m[0], value)

      m = regex.exec(this.fileText)
    }

    this.write(newFile)
  }

  public parse() {
    return this.readAllLines()
  }

  write(...data: string[]) {
    this.fileWriter.write(this, ...data)
    return this
  }

  append(...data: string[]) {
    this.fileWriter.append(this, ...data)
    return this
  }

  public get length() {
    return this.readAllLines().length
  }
}
