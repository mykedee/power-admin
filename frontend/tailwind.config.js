/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js}"],
	theme: {
		extend: {
			colors: {
				"text-color": "#2d2d2d",
				"primary-orange": "#fbc50b",
				"global-text": "#1e2329",
				"primary-orange-hover": "#deac00",
				"orange-lite": "rgb(251, 247, 244)",
				"danger-primary-hover": "#cf3333",
				"danger-primary": "#ef4444",
				"primary-green": "#004d0c",
				"primary-green-lite": "#B8CBBB",
				"primary-green-prelite": "#004d0c",
				"card-light": "#fcfcfc",
				"dash-bg": "#f1f5f9",
				"scroll-bg": "#a6a6a6",
				"dash-dark-btn": "#5a55ec",
			},
		},
	},
	plugins: [],
	darkMode: "class",
};
