import { FileWriter } from './file-writer'
import { writeFileSync } from 'fs'
import { JsonDictionaryFile } from './json-dictionary-file'
import { RecordDecorator } from './record-decorator'

type File<K extends number | string, V> = JsonDictionaryFile<K, V>
type T<K extends number | string, V> = Record<K, V>

export class JsonDictionaryFileWriter<K extends number | string, V>
  implements FileWriter<T<K, V>, File<K, V>> {
  public write(file: File<K, V>, data: T<K, V>) {
    file.fileText = JSON.stringify(data, null, 2)
    writeFileSync(file.filePath, file.fileText)
  }

  public append(file: File<K, V>, data: T<K, V>) {
    const d = new RecordDecorator(Object(file.parse() || {}) as T<K, V>)
    this.write(file, d.append(data).record)
  }
}
