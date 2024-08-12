//跑馬燈
import Marquee from "react-fast-marquee";

//image
import Icon_Marquee from "/src/assets/Icon_Marquee.png";

const HomeMarquee = () => {
  return (
    <div className="mx-auto my-2 flex w-10/12 items-center text-white">
      <div>
        <img
          className="h-auto w-auto max-w-[15px] brightness-0 invert filter"
          src={Icon_Marquee}
          alt="marquee"
        />
      </div>
      <div className="w-full pl-2">
        <Marquee>所有報價資訊資料源參考連結</Marquee>
      </div>
    </div>
  );
};
export default HomeMarquee;
