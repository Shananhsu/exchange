import React from "react";

interface Props {
    chips: number[];
    handleSetChipsValue: any;
}

// image
import Icon_Chips from "/src/assets/Icon_Chips.png";

const BetChips = ({ chips, handleSetChipsValue }: Props) => {
    return (
        <div className="mx-auto text-white">
            <p className="py-1 text-center text-xs">快速投注</p>
            <div className="grid grid-cols-3 gap-3">
                {chips.map((chip) => (
                    <button
                        key={chip}
                        className="relative"
                        onClick={() => handleSetChipsValue(chip.toString())}
                    >
                        <img
                            src={Icon_Chips}
                            alt="Chips"
                            className="h-auto w-auto max-w-[45px]"
                        />
                        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-xs">
                            {chip}
                        </p>
                    </button>
                ))}
            </div>
        </div>
    );
};
export default React.memo(BetChips);
