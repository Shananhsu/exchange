//images
import LogoPng from "/src/assets/Logo.png";

//type
interface Props {
  handleLogoState: () => void;
}

const Logo = ({ handleLogoState }: Props) => {
  return (
    <div
      onClick={handleLogoState}
      className="fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-bodyBgc"
    >
      <button className="flex flex-col items-center">
        <img src={LogoPng} alt="Logo" className=" h-32 w-32" />
        <p className="text-2xl text-logo">PiNARY</p>
        <p className="text-sm text-logo">Powered by GET Chain</p>
      </button>
    </div>
  );
};

export default Logo;
