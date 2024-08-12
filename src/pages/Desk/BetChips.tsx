import React from "react";
//type
interface Props {
  chips: number[];
  handleSetChipsValue: any;
}

//image
import Icon_Chips from "/src/assets/Icon_Chips.png";

const BetChips = ({ chips, handleSetChipsValue }: Props) => {
  return (
    <div className="mx-20 mt-5 text-white">
      <p className="mx-auto py-1 text-center text-xl font-black">快速投注</p>
      <div className="grid grid-cols-3 gap-x-3 gap-y-2">
        {chips.map((chip) => (
          <button
            key={chip}
            className="relative mx-auto hover:text-deepYellow"
            onClick={() => handleSetChipsValue(chip.toString())}
          >
            <img
              src={Icon_Chips}
              alt="Chips"
              className="h-auto w-auto max-w-[70px]"
            />
            <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-xl">
              {chip}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};
export default React.memo(BetChips);
