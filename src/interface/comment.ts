import { UserEasy } from './user';
export interface CommentItemInfo{
    childrens:Array<CommentItemInfo>,
    content:string,
    createDate:string,
    id:string,
    toUser?:UserEasy,
    user:UserEasy,
}