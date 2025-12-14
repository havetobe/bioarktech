/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#1c4ed8',
          navy: '#0f1e36',
          teal: '#1dab8f',
        },
      },
      fontFamily: {
        heading: ['"Poppins"', 'ui-sans-serif', 'system-ui'],
        body: ['"Inter"', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        header: '0 12px 40px rgba(19, 45, 110, 0.1)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(120deg, rgba(236, 242, 255, 0.95), rgba(219, 240, 248, 0.95))',
      },
    },
  },
  plugins: [],
};
