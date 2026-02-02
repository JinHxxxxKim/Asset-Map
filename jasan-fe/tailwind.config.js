// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  // 아래 content 부분이 비어있으면 스타일이 적용되지 않습니다.
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}