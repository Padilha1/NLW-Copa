/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.tsx"],
	theme: {
		extend: {
			fontFamily: {
				sans: "Roboto, sans-serif",
			},
			backgroundImage: {
				app: 'url(/BG-effects.png)',
			},

			colors: {
				ignite: {
					500: "#129E57",
				},
				gray: {
					100: "#E1E1E6",
					300: "#8D8D99",
					600: "#323238",
					800: "#202024",
				},
				yellow: {
					500: "#F7DD43",
					600: "#E5CD3D",
				},
			},
		},
	},
	plugins: [],
};