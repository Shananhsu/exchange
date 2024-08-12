import { Response } from "./response";

export interface KLineResponse extends Response<KLineData> { }

export interface KLineData {
    symbol: string;
    period: number;
    lines: KLine[];
}

export interface KLine {
    time: string;
    open: number;
    high: number;
    low: number;
    close: number;
    ts: number;
}