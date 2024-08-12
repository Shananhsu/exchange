//共用元件 接受一個路徑 type string
import BackButton from "../../components/BackButton";

//type
interface Props {
  backButtonLink: string;
}

const Navbar = ({ backButtonLink }: Props) => {
  return (
    <div className="relative mx-auto flex w-10/12 items-center justify-center pt-3">
      <BackButton backButtonLink={backButtonLink} />
      <h1 className="text-center text-2xl font-black text-white">出入金紀錄</h1>
    </div>
  );
};
export default Navbar;
