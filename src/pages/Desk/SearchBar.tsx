import Icon_Search from "/src/assets/Icon_Search.png";

const SearchBar = () => {
  return (
    <div className="mx-auto mt-5 flex w-10/12 items-center justify-center">
      <div className="relative w-full rounded-sm border-2 border-solid border-gray-500">
        <div className="absolute top-1/2 -translate-y-1/2 transform pl-2">
          <img src={Icon_Search} alt="Icon_Search" className="h-6 w-auto" />
        </div>
        <input
          type="text"
          placeholder="搜尋幣種名稱"
          className="h-10 w-full bg-arerBgc pl-12 text-2xl font-black text-white"
        />
      </div>
    </div>
  );
};
export default SearchBar;
