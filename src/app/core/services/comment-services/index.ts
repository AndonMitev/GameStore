import { CreateCommentGameService } from './create-comment.service';
import { DeleteCommentService } from './delete-comment.service';
import { GetAllCommentsService } from './get-all-comments-game.service';
import { GetUserCommentsService } from './get-user-comments.service';

export const COMMENT_SERVICES = [
  CreateCommentGameService,
  DeleteCommentService,
  GetAllCommentsService,
  GetUserCommentsService
];
