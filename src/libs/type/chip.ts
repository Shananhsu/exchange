import { Response } from "./response";

export interface ChipResponse extends Response<ChipData> { }

export interface ChipData {
    chips: number[];
}
