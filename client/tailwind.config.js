/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
				'bright-blue': 'hsl(220, 98%, 61%)',
				'check-background-start': 'hsl(192, 100%, 67%)',
				'check-background-end': 'hsl(280, 87%, 65%)',

				'light-gray': 'hsl(0, 0%, 98%)',
				'light-gray-blue-100': 'hsl(236, 33%, 92%)',
				'light-gray-blue-200': 'hsl(233, 11%, 84%)',
				'light-gray-blue-300': 'hsl(236, 9%, 61%)',
				'light-gray-blue-400': 'hsl(235, 19%, 35%)',
				
				'dark-blue': 'hsl(235, 21%, 11%)',
				'dark-desaturated-blue': 'hsl(235, 24%, 19%)',
				'dark-gray-blue-100': 'hsl(234, 39%, 85%)',
				'dark-gray-blue-200': 'hsl(234, 11%, 52%)',
				'dark-gray-blue-300': 'hsl(233, 14%, 35%)',
				'dark-gray-blue-400': 'hsl(237, 14%, 26%)',
			},
    },
  },
  plugins: [],
}
