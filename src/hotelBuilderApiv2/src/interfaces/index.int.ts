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

export interface Data {
    fullname?: string;
    username?: string;
    email?: string;
    age?: number;
    password?: string | null;
}

export interface Message {
    fullname?: string;
    username?: string;
    email?: string;
    age?: string;
    password?: string ;
}