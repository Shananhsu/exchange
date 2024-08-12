export interface Event<T> {
    cmd: string;
    msgtime: string;
    Data: T;
}

export interface Quote {
    symbol: string;
    last: number;
    ts: number;
    qtime: string;
    change: number;
    changepercent: number;
    refclose: number;
}

export interface KLine {
    symbol: string;
    period: number;
    unit: number;
    open: number;
    high: number;
    low: number;
    close: number;
    ts: number;
    ktime: string;
}

export interface Deal {
    symbol: string;
    orderID: string;
    dtime: string;
    ts: number;
    dealprice: number;
    winprice: number;
    loseprice: number;
    winpercent: number;
    expectwin: number;
    longshort: number;
}

export interface SettlePercent {
    symbol: string;
    orderID: string;
    percent: number;
    issettled: boolean;
}
