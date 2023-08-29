/** @type {import('tailwindcss').Config} */
const daisyuiPlugin = require("daisyui");

module.exports = {
  content: [
    "./src/**/*.js",
    "./src/**/*.vue",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
        {
            mytheme: {
                dark: "#333333",
                white: "#ffffff",
                primary: "#3d2487",
                secondary: "#e2e2e2",
                accent: "#04873f",
                neutral: "#201820",
                info: "#70bfe1",
                success: "#1d9f83",
                warning: "#f0c814",
                error: "#e23c68",
            },
        },
    ],
},
plugins: [daisyuiPlugin],
}

