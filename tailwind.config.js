module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        "mainText" : "#000000" ,
        "subText" : "#000000A6" ,
        "white" : "#FFFFFF",
        "darkBackground" : "#050808"
      },
      images: {
        imageSizes: [10, 16, 32, 48, 64, 96, 128, 256, 384],
      },
    },
  },
  plugins: [],
}
