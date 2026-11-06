import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f5fa',
          100: '#e1ecf5',
          200: '#c3d9eb',
          300: '#94bcdd',
          400: '#5e9ac9',
          500: '#387eb3',
          600: '#286496',
          700: '#21507a',
          800: '#1e4465',
          900: '#0b1b3d',
          950: '#071126',
        },
      },
    },
  },
  plugins: [],
};

export default config;

