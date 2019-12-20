import { BaseFile } from './base-file';
import { JsonDictionaryFileWriter } from './json-dictionary-file-writer';
import { RecordDecorator } from '../sass-tool/record-decorator';
import { KeyedFile } from './file';

export class JsonDictionaryFile<K extends number | string, T>
  extends BaseFile<Record<K, T>>
  implements KeyedFile<K, T> {
  private results = new RecordDecorator({} as Record<K, T>);

  public constructor(filePath: string) {
    super(filePath, JsonDictionaryFileWriter);
    this.parse();
  }

  public parse() {
    this.results.clear();
    this.results.append(JSON.parse(this.fileText || JSON.stringify({})));
    return this.results.record;
  }

  public replace(key: K, value: T) {
    this.results.set(key, value);
    return this;
  }

  public get length() {
    return this.results.length;
  }

  write(data: Record<K, T>) {
    this.fileWriter.write(this, data);
    return this;
  }

  append(data: Record<K, T>) {
    this.fileWriter.append(this, data);
    return this;
  }
}
