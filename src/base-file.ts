import { File } from './file';
import { existsSync, readFileSync, writeFileSync, unlinkSync } from 'fs';
import { FileWriter } from './file-writer';

export abstract class BaseFile<T> implements File<T> {
  public fileText: string;
  public fileWriter: FileWriter<T, File<T>>;

  public constructor(
    public readonly filePath: string,
    fileWriter: new () => FileWriter<T, File<T>>
  ) {
    this.fileText = this.readAllText();
    this.fileWriter = new fileWriter();
  }

  public readAllText() {
    if (!existsSync(this.filePath)) {
      writeFileSync(this.filePath, '');
    }

    this.fileText = readFileSync(this.filePath, { encoding: 'utf8' });
    return this.fileText;
  }

  public readAllLines() {
    return this.readAllText()
      .replace('\r\n', '\n')
      .split('\n');
  }

  public test(regex: RegExp) {
    return regex.test(this.fileText);
  }

  public delete() {
    unlinkSync(this.filePath);
  }

  abstract get length(): number;
}
