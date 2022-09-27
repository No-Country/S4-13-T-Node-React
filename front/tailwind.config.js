module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      primary: '#7F32EC',
      secondary: '#FD8A09',
      text: '#111110',
      link: '#1053FF',
      accent: '#74726F',
      bgCard: '#FDFDFD',
      white: '#fff',
    },
    fontFamily: {
      orelega: 'Orelega One, cursive',
      roboto: 'Condensed, sans-serif',
    },
    screens: {
      xs: '360px',
      sm: '512px',
      md: '744px',
      lg: '1440px',
    },
    extend: {},
  },
  plugins: [],
};
