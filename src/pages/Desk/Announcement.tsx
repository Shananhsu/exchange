import { useState } from "react";

const annBtn = [
  { id: 1, text: "系統公告" },
  { id: 2, text: "玩法說明" },
];

//系統公告文字內容元件
const AnnouncementText = () => {
  return <p>系統公告-內容待更新</p>;
};

//玩法說明文字內容元件
const PlayRule = () => {
  return <p>玩法說明-內容待更新</p>;
};

//1 = 系統公告
//2 = 玩法說明
const Announcement = () => {
  const [state, setState] = useState(1);

  //選擇顯示公告or玩法說明
  const handleBtn = (id: number) => {
    setState(id);
  };
  return (
    <div>
      <div className="flex text-xl font-black">
        {annBtn.map((item) => (
          <button
            className={`w-1/2 ${
              item.id === state
                ? "text-deepYellow"
                : "text-white opacity-50 hover:opacity-100"
            }`}
            key={item.id}
            onClick={() => handleBtn(item.id)}
          >
            {item.text}
          </button>
        ))}
      </div>
      <div className="mt-4 h-[calc(100vh-25rem)] rounded-2xl bg-arerBgc p-3 text-white">
        {state === 1 && <AnnouncementText />}
        {state === 2 && <PlayRule />}
      </div>
    </div>
  );
};
export default Announcement;
