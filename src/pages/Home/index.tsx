import { useMemo, useState } from "react";

// api
import { useAppSelector } from "../../redux/hooks";
import { useGetCommodityQuery } from "../../redux/commoditySlice";

// components
import Navbar from "./Navbar";
import Carousel from "./Carousel";
import HomeMarquee from "./HomeMarquee";
import LinkMenu from "./LinkMenu";
import PopularItems from "./PopularItems";

const Home = () => {
    const token = useAppSelector((state) => state.token.token);

    const { data: commodityResponse, isSuccess, } = useGetCommodityQuery({ maincategory: "finance", token });

    // 篩選只要熱門商品
    const items = useMemo(() => {
        if (!isSuccess) return [];
        return commodityResponse.data.commodities.filter(
            (commodity) => commodity.ishot
        );
    }, [commodityResponse, isSuccess]);

    return (
        <div className="flex h-screen flex-col bg-bodyBgc">
            <Navbar />
            <Carousel />
            <HomeMarquee />
            <LinkMenu />
            <PopularItems items={items} />
        </div>
    );
};
export default Home;
