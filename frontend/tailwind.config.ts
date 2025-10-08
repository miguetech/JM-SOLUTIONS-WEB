import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#0D47A1',
        'accent-blue': '#00BFFF',
        'background-dark': '#0A0A0A',
        'text-light': '#B0BEC5',
        'secondary-dark': '#424242',
      },
      fontFamily: {
        'exo': ['Exo 2', 'sans-serif'],
        'lato': ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
