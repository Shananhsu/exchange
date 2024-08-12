//images
import Logo_Pinary from "/src/assets/Logo_Pinary.png";
import Icon_CustomerService from "/src/assets/Icon_CustomerService.png";

const Navbar = () => {
  return (
    <div className="mx-auto flex w-10/12 justify-between pt-2">
      <img
        className="h-auto max-h-[20px] w-auto max-w-[100px]"
        src={Logo_Pinary}
        alt="Pinary"
      />
      <img
        className="h-auto w-auto max-w-[20px] brightness-0 invert filter"
        src={Icon_CustomerService}
        alt="CustomerService"
      />
    </div>
  );
};
export default Navbar;
