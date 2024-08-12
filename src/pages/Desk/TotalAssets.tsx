interface Props {
  balance: string | number;
  totalasset: string | number;
  profit: string | number;
}

const TotalAssets = ({ balance, totalasset, profit }: Props) => {
  let prefix = "";
  let color = "text-white";
  if (typeof profit === "number") {
    if (profit > 0) {
      prefix = "+";
      color = "text-win";
    } else if (profit < 0) {
      color = "text-lose";
    }
  }
  return (
    <div className="font-black text-white">
      <div className="mx-auto h-56 rounded-lg bg-arerBgc pl-5">
        <h1 className="pt-3 text-lg">總資產</h1>
        <h1 className="mt-2">{Number(totalasset).toLocaleString()}</h1>
        <div className="mt-2 flex">
          <p className="w-3/6">可用餘額</p>
          <p>今日盈虧</p>
        </div>
        <div className="mt-2 flex">
          <p className="w-3/6">{Number(balance).toLocaleString()}</p>
          <p className={color}>
            {prefix}
            {profit}
          </p>
        </div>
        <div className="mt-5 flex">
          <div className="h-16 w-3/6">
            <button className="h-3/5 w-3/5 rounded-lg bg-btnYellowBgc">
              入金
            </button>
          </div>
          <div className="h-16 w-3/6">
            <button className="h-3/5 w-3/5 rounded-lg bg-btnGreyBgc">
              出金
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalAssets;
