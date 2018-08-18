export class CreateMessageInputModel {
  constructor(
    public from: string,
    public recipient: string,
    public title: string,
    public content: string,
    public recepientId: string
  ) {}
}
