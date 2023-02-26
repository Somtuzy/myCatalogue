import { iUser } from "./service.int";
import { Request } from "express";

export interface iPayload {
    username: string;
    userid: string;
}

export interface AuthRequest extends Request {
    user?: iUser;
}

export interface MyObject {
    [key: string]: any;
}