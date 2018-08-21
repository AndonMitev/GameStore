import { UserRegisterService } from './register.service';
import { UserLoginService } from './login.service';
import { UserVerificationService } from './verification.service';
import { UserLogoutService } from './logout.service';

export const AUTHENTICATION_SERVICES = [
  UserRegisterService,
  UserLoginService,
  UserLogoutService,
  UserVerificationService
];
