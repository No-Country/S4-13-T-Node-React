const { transform } = require('typescript');

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
      black: '#000',
      error: '#FF0000',
    },
    fontFamily: {
      orelega: 'Orelega One, cursive',
      roboto: 'Roboto Condensed, sans-serif',
    },
    screens: {
      xs: '360px',
      sm: '512px',
      md: '744px',
      lg: '1440px',
    },
    screens: {
      xs: '360px',
      sm: '512px',
      md: '744px',
      lg: '1440px',
    },
    extend: {
      height: {
        18: '4.5rem',
      },
      boxShadow: {
        'header-shadow':
          '0px 5px 10px 3px rgba(253, 138, 9, 0.1), 0px 3.24074px 5.85648px 3px rgba(253, 138, 9, 0.0759259), 0px 1.92593px 3.18519px 3px rgba(253, 138, 9, 0.0607407), 0px 1px 1.625px 3px rgba(253, 138, 9, 0.05), 0px 0.407407px 0.814815px 3px rgba(253, 138, 9, 0.0392593), 0px 0.0925926px 0.393519px 3px rgba(253, 138, 9, 0.0240741)',
      },
      animation: {
        'spin-load': 'spinFast 2s cubic-bezier(0,.99,.27,.87) infinite',
      },
      keyframes: {
        spinFast: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(180deg)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
