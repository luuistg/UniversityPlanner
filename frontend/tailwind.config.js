import { text } from "stream/consumers";

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
      'bg-pink-400', 'bg-orange-400', 'bg-yellow-400',
      'bg-green-400', 'bg-red-400', 'bg-indigo-400',
      'bg-cyan-400', 'bg-purple-400', 'bg-lime-400',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FEFCD9',
        secondary: '#FF4747',
        text: '#1A1A1A',
        textSecondary: '#8A8960',
      },
    },
  },
  plugins: [],
}