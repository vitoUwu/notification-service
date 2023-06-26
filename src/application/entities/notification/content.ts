export class Content {
  private readonly content: string;

  get value() {
    return this.content;
  }

  private validateContentLength(content: string): boolean {
    return content.length >= 5 && content.length <= 240;
  }

  constructor(content: string) {
    if (!this.validateContentLength(content)) {
      throw new Error('Invalid Content Length');
    }

    this.content = content;
  }
}
