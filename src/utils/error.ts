export default class error {
  private constructor() {}

  public static throw(message: string) {
    throw new Error(message);
  }
}
