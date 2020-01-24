import { FileWriter } from './file-writer'

export interface File<T> {
  filePath: string
  fileText: string
  fileWriter: FileWriter<T, File<T>>
  readAllText(): string
  readAllLines(): string[]
  delete(): void
  test(regex: RegExp): boolean
}

export interface IndexedFile<T> extends File<T> {
  replace(index: number, value: T): this
  parse(): T[] | undefined
  write(...data: T[]): this
  append(...data: T[]): this
  length: number
}

export interface KeyedFile<K extends number | string, V>
  extends File<Record<K, V>> {
  replace(index: K, value: V): this
  parse(): Record<K, V> | undefined
  write(data: Record<K, V>): this
  append(data: Record<K, V>): this
  length: number
}
