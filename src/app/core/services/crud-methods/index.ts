import { GetMethod } from './get-method.service';
import { PostMethod } from './post-method.service';
import { DeleteMethod } from './delete-method.service';
import { PutMethod } from './put-method.service';

export const CRUD_METHODS = [GetMethod, PostMethod, DeleteMethod, PutMethod];
