import { Response } from "./response";

export interface TokenResponse extends Response<TokenData> { }

export interface TokenData {
    "jwttoken": string;
}

export enum TokenCheck {
    Ok,
    Error,
    Wait
}