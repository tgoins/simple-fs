import { FileWriter } from './file-writer';

export interface File<T> {
  filePath: string;
  fileText: string;
  fileWriter: FileWriter<T, File<T>>;
  readAllText(): string;
  readAllLines(): string[];
  delete(): void;
  test(regex: RegExp): boolean;
  length: number;
}

export interface IndexedFile<T> extends File<T> {
  replace(index: number, value: T): this;
  parse(): ReadonlyArray<T>;
  write(...data: T[]): this;
  append(...data: T[]): this;
}

export interface KeyedFile<K extends number | string, V>
  extends File<Record<K, V>> {
  replace(index: K, value: V): this;
  parse(): Readonly<Record<K, V>>;
  write(data: Record<K, V>): this;
  append(data: Record<K, V>): this;
}
