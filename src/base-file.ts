import { File } from './file';
import { existsSync, readFileSync, writeFileSync, unlinkSync } from 'fs';
import { FileWriter } from './file-writer'

export abstract class BaseFile<T, FW extends FileWriter<T, File<T>>> implements File<T> {
  public fileText: string;
  public fileWriter: FW

  public constructor(
    public readonly filePath: string,
    fileWriter: new () => FW
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
}
