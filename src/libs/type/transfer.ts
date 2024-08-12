import { Response } from "./response";

export interface TransferResponse extends Response<TransferData> { }

export interface TransferData {
    list: Transfer[];
}

export interface Transfer {
    recordtime: string;
    recordts: number;
    amount: number;
    inout: number;
    state: number;
}