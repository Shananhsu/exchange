import { useMemo } from "react";

//type
import { Commodity } from "../../libs/type/commodity";
import { Range } from "../../libs/type/range";

interface Props {
  commodity: Commodity | undefined;
  range: Range;
  handlBuy: (longshort: number) => void;
}

const BetButton = ({ commodity, range, handlBuy }: Props) => {
  const [touchWinL, touchWinR] = useMemo(() => {
    if (!commodity) return [0, 0];

    return [
      (commodity.lastclose * (1 + Number(range.winpercent) / 100))
        .toString()
        .toDigital(commodity.floatdigit),
      (commodity.lastclose * (1 - Number(range.winpercent) / 100))
        .toString()
        .toDigital(commodity.floatdigit),
    ];
  }, [commodity, range]);

  const [touchLoseL, touchLoseR] = useMemo(() => {
    if (!commodity) return [0, 0];
    return [
      (commodity.lastclose * (1 - Number(range.losepercent) / 100))
        .toString()
        .toDigital(commodity.floatdigit),
      (commodity.lastclose * (1 + Number(range.losepercent) / 100))
        .toString()
        .toDigital(commodity.floatdigit),
    ];
  }, [commodity, range]);
  return (
    <div className="mt-10 flex justify-center text-white">
      <div className="w-full text-center">
        <button
          className="w-3/4 rounded-lg bg-green-500 py-2 text-2xl font-black"
          onClick={() => handlBuy(1)}
        >
          看 漲
        </button>
        <div className="mt-2">
          <p className="text-green-500">Touch WIN: {touchWinL}</p>
          <p className="mt-1 text-lose">Touch LOSE: {touchLoseL}</p>
        </div>
      </div>
      <div className="w-full text-center">
        <button
          className="w-3/4 rounded-lg bg-lose py-2 text-2xl font-black"
          onClick={() => handlBuy(-1)}
        >
          看 跌
        </button>
        <div className="mt-2">
          <p className="text-green-500">Touch WIN: {touchWinR}</p>
          <p className="mt-1 text-lose">Touch LOSE: {touchLoseR}</p>
        </div>
      </div>
    </div>
  );
};
export default BetButton;
