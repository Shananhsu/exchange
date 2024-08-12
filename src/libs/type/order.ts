import { Response } from "./response";

export interface OrderResponse extends Response<OrderData> { }

export interface OrderData {
    orders: TOTrder[];
}

export interface TOTrder {
    symbol: string;
    orderid: string;
    longshort: number;
    betamount: number;
    winprice: number;
    loseprice: number;
    auto: boolean;
    autotype: KeepType;
    autodir: KeepDirection;
    createtimestamp: number;
    rangepercent: number;
    dealprice: number;
    orderresult: number;
}

export enum KeepDirection {
    Same = 1,
    Reverse = -1,
    None
}

export enum KeepType {
    Win = 1,
    Lose = -1,
    Both = 2,
    None = 0
}