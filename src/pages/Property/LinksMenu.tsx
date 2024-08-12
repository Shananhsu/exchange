import { Link } from "react-router-dom";

//images
import Icon_TransactionHistory from "/src/assets/Icon_TransactionHistory.png";
import Icon_BackToGameLobby from "/src/assets/Icon_BackToGameLobby.png";

const LinksMenu = () => {
  //linkMenuArray
  const linkMenuArray = [
    {
      icon: Icon_TransactionHistory,
      alt: "出入金紀錄",
      link: "/depositHistory",
      id: 1,
    },
    { icon: Icon_BackToGameLobby, alt: "返回遊戲大廳", link: "/", id: 2 },
  ];

  return (
    <div>
      {linkMenuArray.map((data) => (
        <Link to={data.link} key={data.id}>
          <div className="mx-auto mt-3 flex h-8 w-10/12 items-center rounded-lg bg-arerBgc">
            <img
              src={data.icon}
              alt="UserIcon"
              className="mx-2 h-auto max-w-[25px]"
            />
            <p className="text-base font-black text-white">{data.alt}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};
export default LinksMenu;
