//images
import Icon_TransactionHistory from "/src/assets/Icon_TransactionHistory.png";

interface Props {
  handleShowDepositHistory: () => void;
}

const LinksMenu = ({ handleShowDepositHistory }: Props) => {
  //linkMenuArray
  const linkMenuArray = [
    {
      icon: Icon_TransactionHistory,
      alt: "出入金紀錄",
      id: 1,
    },
  ];

  return (
    <div>
      {linkMenuArray.map((data) => (
        <div
          onClick={handleShowDepositHistory}
          className="mx-auto mt-3 flex h-8 items-center rounded-lg bg-arerBgc"
          key={data.id}
        >
          <img
            src={data.icon}
            alt="UserIcon"
            className="mx-2 h-auto max-w-[25px]"
          />
          <p className="text-base font-black text-white">{data.alt}</p>
        </div>
      ))}
    </div>
  );
};
export default LinksMenu;
