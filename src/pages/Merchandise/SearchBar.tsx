//images
import Icon_Search from "/src/assets/Icon_Search.png";

const SearchBar = () => {
    return (
        <div className="mx-auto mt-5 flex w-10/12 items-center justify-center">
            <div className="relative w-10/12">
                <div className="absolute top-1/2 -translate-y-1/2 transform pl-2">
                    <img src={Icon_Search} alt="Icon_Search" className="h-6 w-auto" />
                </div>
                <input
                    type="text"
                    placeholder="輸入品種名稱 / 代碼搜索"
                    className="h-8 w-full rounded-2xl bg-arerBgc pl-10 text-xs font-black text-white"
                />
            </div>
        </div>
    );
};
export default SearchBar;
