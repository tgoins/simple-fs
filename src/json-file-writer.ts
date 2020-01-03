import { FileWriter } from './file-writer';
import { JsonFile } from './json-file';
import { writeFileSync } from 'fs';

type File<T> = JsonFile<T>;

export class JsonFileWriter<T> implements FileWriter<T, File<T>> {
  public write(file: File<T>, data: T) {
    file.fileText = JSON.stringify(data, null, 2);
    writeFileSync(file.filePath, file.fileText);
  }
}
