//type
interface filterBarMenu {
  id: number;
  text: string;
}

interface Props {
  filterBarMenu: filterBarMenu[];
  menuState: number;
  handleFilterMenu: (item: filterBarMenu) => void;
}

const FilterBar = ({ filterBarMenu, menuState, handleFilterMenu }: Props) => {
  return (
    <div className="w-full border-b border-b-gray-500">
      <div className="mx-auto flex w-10/12">
        {filterBarMenu.map((item) => (
          <div key={item.id} className="w-1/3 text-center">
            <button
              onClick={() => handleFilterMenu(item)}
              className={
                menuState === item.id ? "border-b-4 border-b-deepYellow" : ""
              }
            >
              <p
                className={
                  menuState === item.id ? "text-deepYellow" : "text-white"
                }
              >
                {item.text}
              </p>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default FilterBar;
