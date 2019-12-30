import { FileManager } from "./file-manager";
import { JsonDictionaryFile } from "./json-dictionary-file";

export class RecordDecorator<K extends string | number, V> {
  constructor(private _record: Record<K, V> = ({}) as Record<K, V>) { }

  public set(key: K, value: V) {
    this._record[key] = value;
  }

  public get(key: K): V | undefined {
    return Object(this._record)[key]
  }

  public has(key: K) {
    return Object.keys(this._record).includes(key.toString())
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

  public forEach(f: (k: K, v: V, i: number) => void) {
    Object.keys(this._record).forEach(((k, i) => f(k as unknown as K, this._record[k as unknown as K], i)))
  }

  public toMap() {
    const map = new Map<K, V>()

    for (const key of Object.keys(this._record)) {
      map.set(key as K, this.get(key as K)!)
    }

    return map
  }

  public get record() {
    const r: Readonly<Record<K, V>> = this._record;
    return r;
  }

  public get length() {
    return Object.keys(this._record).length;
  }

  public static fromFile<K extends number | string, V>(
    file: string
  ): RecordDecorator<K, V> | undefined {
    const result: Record<K, V> | undefined = FileManager.open<JsonDictionaryFile<K, V>>(
      JsonDictionaryFile,
      file
    ).parse();

    if (!result) {
      return undefined
    }

    return new RecordDecorator<K, V>(result);
  }

  public static fromMap<K extends number | string, V>(map: Map<K, V>) {
    const record = new RecordDecorator<K, V>()

    map.forEach((v, k) => record.set(k, v))

    return record
  }
}
