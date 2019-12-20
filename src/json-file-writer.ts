import { FileWriter } from './file-writer';
import { JsonArrayFile } from './json-array-file';
import { writeFileSync } from 'fs';

export class JsonFileWriter<T> extends FileWriter<T> {
  public write(...data: T[]) {
    this.file.fileText = JSON.stringify(data);
    writeFileSync(this.file.filePath, this.file.fileText);
  }
}
