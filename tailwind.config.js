/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{html,js,jsx,ts,tsx}',
    './components/**/*.{html,js,jsx,ts,tsx}',
    './sections/**/*.{html,js,jsx,ts,tsx}',
    './data/**/*.{html,js,jsx,ts,tsx}',
    './styles/**/*.{js,jsx,ts,tsx}',
    './*.{js,jsx,ts,tsx}',
  ],
  // mode: 'jit',
  theme: {
    extend: {
      colors: {
        'primary-black': '#1A232E',
        'secondary-black': '#3A3F50',
        'secondary-white': '#c7c7c7',
        'custom-purple' : '#A4B7E0',
        'purple1' : '#5F5B73',
        'purple2' : '#8B7995',
        'purple3' : '#BA98B5',
        'purple4' : '#ECB8D1',
        'blue1' : '#D9F3FF',
        'blue2' : '#93ADCF',

      },
      fontFamily: {
        body: ['Fira Code', 'monospace'],
      },
      fontSize: {
        '13px': ['13px', '18px'],
      },
      transitionTimingFunction: {
        'out-flex': 'cubic-bezier(0.05, 0.6, 0.4, 0.9)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),

  ],
};
// https://mycolor.space/?hex=%231A232E&sub=1