import { useTranslation } from "react-i18next";

//type
interface Props {
  filterBarMenu: string[];
  handleFilterMenu: (i: number) => void;
  menuState: number;
}

const FilterBar = ({ filterBarMenu, handleFilterMenu, menuState }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="mx-auto mt-5 flex w-10/12 overflow-x-scroll pb-2 text-white">
      {filterBarMenu.map((item, i) => (
        <button
          key={i}
          className={`mx-2 flex-shrink-0 text-center ${
            menuState === i ? "border-b-4 border-b-deepYellow" : ""
          }`}
          onClick={() => handleFilterMenu(i)}
        >
          <p
            className={`whitespace-nowrap text-2xl font-black hover:text-white ${
              menuState === i ? "text-deepYellow" : "text-gray-500"
            }`}
          >
            {t(item)}
          </p>
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
