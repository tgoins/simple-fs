export class FileManager {
  public static open<T>(file: new (filePath: string) => T, filePath: string) {
    return new file(filePath)
  }
}
