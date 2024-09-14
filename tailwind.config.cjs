// tailwind.config.js
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      lineHeight: {
        'tight': '1.25', // Tighter line spacing
        'loose': '1.75', // Looser line spacing
        'custom-tight': '1.1',  // Even tighter line spacing
      },
      fontSize: {
        'custom': '1.875rem',
        'huge': '7rem',
      },
      fontFamily: {
        sans: ["Be Vietnam Pro", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        white: '#ffffff',
        magenta: '#FF00FF',
        teal: '#00FFFF',
        softYellow: '#fff49b',
        softOrange: '#FFB347',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.black'),
            h1: { color: theme('colors.black') },
            h2: { color: theme('colors.black') },
            h3: { color: theme('colors.black') },
            h4: { color: theme('colors.black') },
            h5: { color: theme('colors.black') },
            h6: { color: theme('colors.black') },
          },
        },
        servicesList: {
          css: {
            color: '#A0A0A0', // Ensure text color is light gray
            lineHeight: theme('lineHeight.custom-tight'), // Custom tighter line spacing
            fontWeight: 'normal', // Unbolded
            marginBottom: '0.25rem', // Reduced spacing between list items
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
