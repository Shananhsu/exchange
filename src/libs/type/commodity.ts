import { Response } from "./response";

export interface CommodityResponse extends Response<CommodityData> { }

export interface CommodityData {
  commodities: Commodity[];
}

export interface Commodity {
  maincategory: string; // 主類別
  subcategory: string; // 次類別
  symbol: string; // 商品代碼
  symbolname: string; // 商品名稱
  ishot: boolean; // 是否為熱門商品
  refclose: number; // 前一天收盤價
  high: number; // 最高價
  low: number; // 最低價
  lastclose: number; // 現價
  change: number;
  changepercent: number;
  floatdigit: number; //顯示到小數點第幾位
  ts?: number;
}
