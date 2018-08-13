import { GameStoreModule } from './game-store.module';

describe('GameStoreModule', () => {
  let gameStoreModule: GameStoreModule;

  beforeEach(() => {
    gameStoreModule = new GameStoreModule();
  });

  it('should create an instance', () => {
    expect(gameStoreModule).toBeTruthy();
  });
});
