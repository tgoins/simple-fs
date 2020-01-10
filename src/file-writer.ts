import { File, IndexedFile, KeyedFile } from './file'

export interface FileWriter<T, F extends File<T>> {
  write(file: F, ...data: T[]): void
  append?(file: F, ...data: T[]): void
}
