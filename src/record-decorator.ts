import { FileManager } from "./file-manager";
import { JsonDictionaryFile } from "./json-dictionary-file";

export class RecordDecorator<K extends string | number, V> {
  constructor(private _record: Record<K, V>) { }

  public set(key: K, value: V) {
    this._record[key] = value;
  }

  public get(key: K) {
    return this._record[key];
  }

  public has(key: K) {
    return !!this.get(key);
  }

  public append(...records: Record<K, V>[]) {
    records.forEach(record => {
      this._record = { ...Object(this._record), ...Object(record) };
    });
    return this;
  }

  public clear() {
    this._record = {} as Record<K, V>;
    return this;
  }

  public get record() {
    const r: Readonly<Record<K, V>> = this._record;
    return r;
  }

  public get length() {
    return Array.of(this._record).length;
  }

  public static fromFile<K extends number | string, V>(
    file: string
  ): RecordDecorator<K, V> {
    const result: Record<K, V> = FileManager.open<JsonDictionaryFile<K, V>>(
      JsonDictionaryFile,
      file
    ).parse();

    return new RecordDecorator<K, V>(result);
  }
}
