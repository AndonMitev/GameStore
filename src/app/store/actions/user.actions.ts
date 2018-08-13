import {Action} from '@ngrx/store'
import { RegisterInputModel } from '../../core/models/input-models/register.model';

export const GET_USER = '[USER] Get';

export class GetUser implements Action {
  readonly type:string = GET_USER;
  constructor(public payload: RegisterInputModel) { }
}

export type Types = GetUser