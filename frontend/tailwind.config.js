import { text } from "stream/consumers";

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
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