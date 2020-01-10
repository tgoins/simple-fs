import { BaseFile } from './base-file'
import { JsonFileWriter } from './json-file-writer'

export class JsonFile<T> extends BaseFile<T, JsonFileWriter<T>> {
  private result?: T

  public constructor(filePath: string) {
    super(filePath, JsonFileWriter)
    this.parse()
  }

  public parse() {
    if (!this.fileText) {
      return undefined
    }

    this.result = JSON.parse(this.fileText) as T
    return this.result as Readonly<T>
  }

  write(data: T) {
    this.fileWriter.write(this, data)
    return this
  }
}
