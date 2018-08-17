export class CreateMessageInputModel {
  constructor(public recipient: string, public title: string, public content: string) {}
}