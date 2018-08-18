export class CreateGameInputModel {
  constructor(
    public title: string,
    public image: string,
    public publisher: string,
    public developer: string,
    public series: string,
    public selectedPlatform: string,
    public release: string,
    public genre: string,
    public description: string,
    public mode: string,
    public price: number,
    public subscriptions: string[]
  ) {}
}
