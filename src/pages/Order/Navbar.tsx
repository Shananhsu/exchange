//images
import Icon_CustomerService from "/src/assets/Icon_CustomerService.png";

const Navbar = () => {
  return (
    <div className="mx-auto flex w-11/12 justify-between pt-3 text-white">
      <div>
        <p className=" text-xl font-black">訂單資訊</p>
      </div>
      <div>
        <img
          className="h-auto w-auto max-w-[20px] brightness-0 invert filter"
          src={Icon_CustomerService}
          alt="CustomerService"
        />
      </div>
    </div>
  );
};
export default Navbar;
