import { Link } from "react-router-dom";

//image
import Icon_BackButton from "/src/assets/Icon_BackButton.png";

//type
interface Props {
  backButtonLink: string;
}

const BackButton = ({ backButtonLink }: Props) => {
  return (
    <Link to={backButtonLink}>
      <div className="absolute left-0 top-3">
        <img
          className="max-w-[40px] brightness-0 invert filter"
          src={Icon_BackButton}
          alt="上一頁"
        />
      </div>
    </Link>
  );
};
export default BackButton;
