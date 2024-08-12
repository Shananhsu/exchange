import { useMemo, useState } from "react";

// api
import { useAppSelector } from "../../redux/hooks";
import { useGetCommodityQuery } from "../../redux/commoditySlice";

// type
import { Commodity } from "../../libs/type/commodity";

// components
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import ItemsList from "./ItemsList";

const Merchandise = () => {
  const token = useAppSelector((state) => state.token.token);

  const { data: commodityResponse, isSuccess, } = useGetCommodityQuery({ maincategory: "finance", token });

  // 選單預設的停留位置
  const [menuState, setMenuState] = useState(1);

  // 篩選列
  const handleFilterMenu = (i: number) => {
    setMenuState(i);
  };

  // 子條目與子條目底下的商品列表
  const { subcategories, commodities } = useMemo(() => {
    let subcategories: string[] = [];
    let commodities: Commodity[] = [];

    if (!isSuccess) return { subcategories, commodities };

    subcategories = [
      "favorite",
      ...new Set(
        commodityResponse.data.commodities.map(
          (commodity) => commodity.subcategory
        )
      ),
    ];

    commodities = commodityResponse.data.commodities.filter(
      (commodity) => commodity.subcategory === subcategories[menuState]
    );

    return { subcategories, commodities };
  }, [commodityResponse, isSuccess, menuState]);

  return (
    <div className="flex h-screen flex-col bg-bodyBgc">
      <SearchBar />
      <FilterBar
        menuState={menuState}
        filterBarMenu={subcategories}
        handleFilterMenu={handleFilterMenu}
      />
      <ItemsList merchandiseData={commodities} />
    </div>
  );
};
export default Merchandise;
