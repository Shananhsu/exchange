import { Response } from "./response";

export interface RangeResponse extends Response<RangeData> { }

export interface RangeData {
    symbol: string;
    ranges: Range[];
}

export interface Range {
    seq: number;
    winpercent: string;
    losepercent: string;
}