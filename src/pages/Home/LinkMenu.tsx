//images
import Icon_PopularProducts from "/src/assets/Icon_PopularProducts.png";
import Icon_GettingStarted from "/src/assets/Icon_GettingStarted.png";
import Icon_TradingRules from "/src/assets/Icon_TradingRules.png";

const LinkMenu = () => {
  //HomeLinkMenuArray
  const linkMenuArray = [
    { icon: Icon_PopularProducts, alt: "熱門商品", id: 1 },
    { icon: Icon_GettingStarted, alt: "使用入門", id: 2 },
    { icon: Icon_TradingRules, alt: "交易規則", id: 3 },
  ];

  return (
    <div className="mx-auto mt-2 w-10/12 rounded-lg bg-homeLinkMenuBgc">
      <div className="flex w-full items-center justify-between py-2">
        {linkMenuArray.map((data) => (
          <div
            className={`w-1/3 ${
              data.id === 2 ? "border-x border-x-gray-400" : ""
            }`}
            key={data.id}
          >
            <img
              className="mx-auto h-6 w-auto"
              src={data.icon}
              alt={data.alt}
            />
            <p className="pt-3 text-center text-xs font-black">{data.alt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default LinkMenu;
