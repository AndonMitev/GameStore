import { GetAllCommentsService } from './get-all-comments-game.service';
import { CreateCommentGameService } from './create-comment.service';
import { DeleteCommentService } from './delete-comment.service';

export const COMMENT_SERVICES = [
  GetAllCommentsService,
  CreateCommentGameService,
  DeleteCommentService
];
