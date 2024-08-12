import { useTranslation } from "react-i18next";

//type
interface Props {
  filterBarMenu: string[];
  handleFilterMenu: any;
  menuState: number;
}

const FilterBar = ({ filterBarMenu, handleFilterMenu, menuState }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="mt-10 w-full border-b border-b-gray-500">
      <div className="mx-auto w-10/12 overflow-x-auto">
        <div className="flex justify-between">
          {filterBarMenu.map((item, i) => (
            <div key={i} className="text-center">
              <button
                className={
                  menuState === i ? "border-b-4 border-b-deepYellow" : ""
                }
                onClick={() => handleFilterMenu(i)}
              >
                <p className="text-sm font-black text-white">{t(item)}</p>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default FilterBar;
