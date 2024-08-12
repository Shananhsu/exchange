import { Outlet, NavLink, useMatch } from "react-router-dom";
import { useTranslation } from "react-i18next";

//images
import Icon_HomeWhite from "/src/assets/Icon_HomeWhite.png";
import Icon_HomeBlue from "/src/assets/Icon_HomeBlue.png";
import Icon_MerchandiseWhite from "/src/assets/Icon_MerchandiseWhite.png";
import Icon_MerchandiseBule from "/src/assets/Icon_MerchandiseBlue.png";
import Icon_OrderWhite from "/src/assets/Icon_OrderWhite.png";
import Icon_OrderBule from "/src/assets/Icon_OrderBlue.png";
import Icon_PropertyWhite from "/src/assets/Icon_PropertyWhite.png";
import Icon_PropertyBlue from "/src/assets/Icon_PropertyBlue.png";

//footer
const footerLinkArray = [
  {
    iconWhite: Icon_HomeWhite,
    iconBlue: Icon_HomeBlue,
    alt: "home",
    link: "/",
    id: 1,
  },
  {
    iconWhite: Icon_MerchandiseWhite,
    iconBlue: Icon_MerchandiseBule,
    alt: "trade",
    link: "merchandise",
    id: 2,
  },
  {
    iconWhite: Icon_OrderWhite,
    iconBlue: Icon_OrderBule,
    alt: "order",
    link: "order",
    id: 3,
  },
  {
    iconWhite: Icon_PropertyWhite,
    iconBlue: Icon_PropertyBlue,
    alt: "property",
    link: "property",
    id: 4,
  },
];

const FooterLayout = () => {
  const { t } = useTranslation();

  return (
    <div>
      <main>
        <Outlet />
      </main>
      <footer className="fixed inset-x-0 bottom-0 mx-auto w-full border-t border-t-gray-500 bg-footerBgc py-1">
        <nav className="flex h-14 items-center justify-around space-x-4 text-center">
          {footerLinkArray.map((data) => {
            const match = useMatch(data.link);
            return (
              <NavLink to={data.link} key={data.id} className="text-xs">
                <img
                  src={match ? data.iconBlue : data.iconWhite}
                  alt={data.alt}
                  className="mx-auto h-7 w-auto"
                />
                <p
                  className={`py-1 ${
                    match ? "text-footerChoose" : "text-white"
                  }`}
                >
                  {t(data.alt)}
                </p>
              </NavLink>
            );
          })}
        </nav>
      </footer>
    </div>
  );
};
export default FooterLayout;
