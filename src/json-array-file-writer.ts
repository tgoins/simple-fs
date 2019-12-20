import { FileWriter } from './file-writer';
import { JsonArrayFile } from './json-array-file';
import { writeFileSync } from 'fs';

type File<T> = JsonArrayFile<T>;

export class JsonArrayFileWriter<T> implements FileWriter<T, File<T>> {
  public write(file: File<T>, ...data: T[]) {
    file.fileText = JSON.stringify(data);
    writeFileSync(file.filePath, file.fileText);
  }

  public append(file: File<T>, ...data: T[]) {
    this.write(file, ...file.parse(), ...data);
  }
}
