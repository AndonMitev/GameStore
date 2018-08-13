import { UserModule } from './user.module';

describe('AuthenticationModule', () => {
  let authenticationModule: UserModule;

  beforeEach(() => {
    authenticationModule = new UserModule();
  });

  it('should create an instance', () => {
    expect(authenticationModule).toBeTruthy();
  });
});
