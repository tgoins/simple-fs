import { BaseFile } from './base-file';
import { JsonArrayFileWriter } from './json-array-file-writer';
import { IndexedFile } from './file';

export class JsonArrayFile<T> extends BaseFile<T, JsonArrayFileWriter<T>> implements IndexedFile<T> {
  private results: T[] = [];

  public constructor(filePath: string) {
    super(filePath, JsonArrayFileWriter);
    this.parse();
  }

  public parse() {
    this.results = JSON.parse(this.fileText || JSON.stringify([])) as T[];
    return this.results as ReadonlyArray<T>;
  }

  public replace(index: number, value: T) {
    this.results[index] = value;
    return this;
  }

  write(...data: T[]) {
    this.fileWriter.write(this, ...data);
    return this;
  }

  append(...data: T[]) {
    this.fileWriter.append(this, ...data);
    return this;
  }

  public get length() {
    return this.results.length;
  }
}
