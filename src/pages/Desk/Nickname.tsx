//images
import UserIcon from "/src/assets/Icon_User.png";

//type
interface Props {
  userNickName: string;
}

const NickName = ({ userNickName }: Props) => {
  return (
    <div className="py-3">
      <div className="mx-auto flex h-14 items-center rounded-lg bg-arerBgc">
        <img
          src={UserIcon}
          alt="UserIcon"
          className="mx-2 h-auto w-auto max-w-[50px] brightness-0 invert filter"
        />
        <p className="text-lg font-black text-white">{userNickName}</p>
      </div>
    </div>
  );
};
export default NickName;
