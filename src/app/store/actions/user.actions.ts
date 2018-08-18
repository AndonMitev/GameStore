import {Action} from '@ngrx/store'
import { RegisterInputModel } from '../../core/models/input-models/register.model';

export const GET_USER_BY_ID = '[USER] Id';
export const GET_USER_BY_USERNAME = '[USER] Username'

export class GetUserById implements Action {
  readonly type:string =  GET_USER_BY_ID;
  constructor(public payload: RegisterInputModel) { }
}

export class GetUserByUsername implements Action {
  readonly type: string = GET_USER_BY_USERNAME;
  constructor(public payload: RegisterInputModel) { }
}

export type Types = GetUserById | GetUserByUsername