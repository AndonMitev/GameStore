import { GetProfileService } from './get-profile.service';
import { GetUserIdByUsernameService } from './get-user-id-by-username.service';
import { GetUserSubscriptionsService } from './get-user-subscrptions.service';
import { EditUserProfileService } from './edit-profile.service';

export const PROFILE_SERVICES = [
  GetProfileService,
  GetUserIdByUsernameService,
  GetUserSubscriptionsService,
  EditUserProfileService
];
