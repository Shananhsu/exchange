import { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";

//type
interface LanguageChangeEvent extends ChangeEvent<HTMLSelectElement> {
	target: HTMLSelectElement;
}

const LanguageSelector = () => {
	const { t, i18n } = useTranslation();
	const [currentLanguage, setCurrentLanguage] = useState<string>(i18n.language);

	const handleLanguageChange = (event: LanguageChangeEvent) => {
		const selectedLanguage = event.target.value;
		i18n.changeLanguage(selectedLanguage);
		setCurrentLanguage(selectedLanguage);
	};

	return (
		<div className="mx-auto mt-5 w-10/12 text-base font-black">
			<p className="ml-3 flex justify-center text-white">
				{currentLanguage === "zh" && `${t("currentLanguage")} : ${t("zh")}`}
				{currentLanguage === "en" && `${t("currentLanguage")} : ${t("en")}`}
			</p>
			<div className="mt-3 flex justify-center">
				<div>
					<p className="text-white">選擇語言：</p>
				</div>
				<select value={currentLanguage} onChange={handleLanguageChange}>
					<option value="en-US">English</option>
					<option value="zh-TW">繁體中文</option>
				</select>
			</div>
		</div>
	);
};
export default LanguageSelector;
