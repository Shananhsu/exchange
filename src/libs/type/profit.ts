import { Response } from "./response";

export interface ProfitResponse extends Response<ProfitData> { }

export interface ProfitData {
    profit: number;
}
