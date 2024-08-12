/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}"
	],
	theme: {
		extend: {
			colors: {
				//背景顏色
				//全域 淺黑色
				'bodyBgc': '#181E25',
				//頁尾 Footer 深黑色
				'footerBgc': '#07080A',
				//區域背景色 淺灰色
				'arerBgc': '#32383F',
				//首頁快速連結 淡黃色
				'homeLinkMenuBgc': '#F5C75B',
				//黃色底色按鈕
				'btnYellowBgc': "#E8BA1B",
				//灰色底色按鈕
				'btnGreyBgc': '#656565',
				//深綠色 市場漲幅
				'darkGreen': '#02C000',
				//透明黑色遮罩
				'opacityBlack': '#00000080',

				//文字顏色
				//Logo
				'logo': '#27F1DE',
				//綠色字
				'win': "#17FF00",
				//紅色字
				'lose': "#FF0004",
				//淡藍色字
				'footerChoose': '#61C1FF',
				//深黃色
				'deepYellow': '#EBC336',
			}
		},
	},
	plugins: [

	],
}

