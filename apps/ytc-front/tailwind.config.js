const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
    {
      mylighttheme: {
        "primary": "#202124",
        "secondary": "#909090",
        "accent": "#FF0000",
        "neutral": "#606060",
        "base-100": "#f5f5f4",
        "info": "#4285F4",
        "success": "#34A853",
        "warning": "#FBBC05",
        "error": "#FF0000"
    },
      mydarktheme: {
        "primary": "#f3f4f6",
        "secondary": "#909090",
        "accent": "#FF0000",
        "neutral": "#606060",
        "base-100": "#1f2937",
        "info": "#4285F4",
        "success": "#34A853",
        "warning": "#FBBC05",
        "error": "#FF0000"
    },
  },
    {
      night : {
        ...require("daisyui/src/theming/themes")["[data-theme=night]"],
        'base-100': 'rgba(49,46,129, 0.4)',
      }
    }, 
    "emerald"],
  },

};
