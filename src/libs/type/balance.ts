import { Response } from "./response";

export interface BalanceResponse extends Response<BalanceData> { }

export interface BalanceData {
    totalasset: number;
    balance: number;
}
