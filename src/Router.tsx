import { createBrowserRouter, RouterProvider } from "react-router-dom";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { useMemo } from "react";

//locales
import enTranslation from "./locales/en.json";
import zhTranslation from "./locales/zh.json";

//components
import FooterLayout from "./components/FooterLayout";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Merchandise from "./pages/Merchandise";
import Order from "./pages/Order";
import Property from "./pages/Property";
import DepositHistory from "./pages/DepositHistory";
import Trade from "./pages/Trade";

//computer
import Desk from "./pages/Desk";
import Error404 from "./pages/Error404";

const resources = {
	"en-US": {
		translation: enTranslation,
	},
	"zh-TW": {
		translation: zhTranslation,
	},
};

const locale = localStorage.getItem("locale");
i18n.use(initReactI18next).init({
	resources,
	lng: locale || navigator?.language || "zh-TW", // 預設語言
	fallbackLng: "en-US", // 如果找不到翻譯，使用的回退語言
	interpolation: {
		escapeValue: false, // 避免 XSS 攻擊
	},
});

//mobile router
const mobileRouter = createBrowserRouter([
	{ path: "auth", element: <Auth /> },
	{
		path: "/",
		element: <FooterLayout />,
		children: [
			{ path: "", element: <Home /> },
			{ path: "merchandise", element: <Merchandise /> },
			{ path: "order", element: <Order /> },
			{ path: "property", element: <Property /> },
		],
	},
	{ path: "depositHistory", element: <DepositHistory /> },
	{ path: "trade/:symbol", element: <Trade /> },
	{ path: "*", element: <Error404 /> }
]);

//computer router
const computerRouter = createBrowserRouter([
	{ path: "auth", element: <Auth /> },
	{ path: "/", element: <Desk /> },
	{ path: "", element: <Desk /> },
	{ path: "merchandise", element: <Desk /> },
	{ path: "order", element: <Desk /> },
	{ path: "property", element: <Desk /> },
	{ path: "depositHistory", element: <Desk /> },
	{ path: "trade/:symbol", element: <Desk /> },
	{ path: "*", element: <Error404 /> },
]);

function Router() {
	const isMobileDevice = useMediaQuery({ maxWidth: 768 });
	const router = useMemo(
		() => (isMobileDevice ? mobileRouter : computerRouter),
		[isMobileDevice]
	);

	return <RouterProvider router={router} />;
}

export default Router;
